import dynamoose from 'dynamoose';
import { ReusableCodeModel } from './reusableCodes';

const BASE62_ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function encodeBase62(num: number): string {
  let encoded = '';
  const base = BASE62_ALPHABET.length;
  while (num > 0) {
    encoded = BASE62_ALPHABET[num % base] + encoded;
    num = Math.floor(num / base);
  }
  return encoded || '1';
}

const PREFIX_MAPPINGS: Record<string, string> = {
  '0': '', 
  '1': 'www.',
  '2': 'http://',
  '3': 'https://',
  '4': 'https://www.',
};

const SUFFIX_MAPPINGS: Record<string, string> = {
  '0': '', 
  '1': '.com',
  '2': '.org',
  '3': '.net',
  '4': '.io',
  '5': '.co',
  '6': '.gov',
};

const PREFIX_LOOKUP: Record<string, string> = Object.fromEntries(
  Object.entries(PREFIX_MAPPINGS).map(([key, value]) => [value, key])
);

const SUFFIX_LOOKUP: Record<string, string> = Object.fromEntries(
  Object.entries(SUFFIX_MAPPINGS).map(([key, value]) => [value, key])
);

function extractPrefixSuffix(url: string): { prefix: string; strippedUrl: string; suffix: string } {
    console.log(`[DEBUG] Original URL: ${url}`);
  
    let prefix = '0';
    let suffix = '0';
    let strippedUrl = url;
  
    for (const [prefixString, prefixCode] of Object.entries(PREFIX_LOOKUP).sort(
      ([a], [b]) => b.length - a.length
    )) {
      if (strippedUrl.startsWith(prefixString)) {
        prefix = prefixCode;
        strippedUrl = strippedUrl.substring(prefixString.length);
        console.log(`[DEBUG] Extracted Prefix: ${prefix}, Remaining URL after prefix: ${strippedUrl}`);
        break;
      }
    }
  

    for (const [suffixString, suffixCode] of Object.entries(SUFFIX_LOOKUP).sort(
      ([a], [b]) => b.length - a.length 
    )) {
      const regex = new RegExp(`(${suffixString})(/|\\?|$)`); 
      const match = strippedUrl.match(regex);
      if (match) {
        suffix = suffixCode;
        strippedUrl = strippedUrl.replace(match[1], '').trim(); 
        console.log(`[DEBUG] Extracted Suffix: ${suffix}, Remaining URL after suffix: ${strippedUrl}`);
        break;
      }
    }
  
    if (!strippedUrl || strippedUrl === '/') {
      strippedUrl = url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''); 
      console.warn(
        `[WARNING] Stripped URL was empty. Falling back to cleaned version: ${strippedUrl}`
      );
    }
  
    console.log(`[DEBUG] Final Extracted -> Prefix: ${prefix}, Stripped URL: ${strippedUrl}, Suffix: ${suffix}`);
    return { prefix, strippedUrl, suffix };
}

export async function deleteShortUrl(shortCode: string): Promise<void> {
    const urlEntry = await UrlModel.get({ shortCode });
    if (!urlEntry) {
      throw new Error('Short URL not found');
    }
  
    await UrlModel.delete({ shortCode });
    console.log(`[DEBUG] Deleted short URL: ${shortCode}`);
  
    await ReusableCodeModel.create({ shortCode });
    console.log(`[DEBUG] Added short code to reusable pool: ${shortCode}`);
  }
  
function reconstructUrl(prefix: string, strippedUrl: string, suffix: string): string {
  const reconstructedUrl = `${PREFIX_MAPPINGS[prefix] || ''}${strippedUrl}${SUFFIX_MAPPINGS[suffix] || ''}`;
  if (!strippedUrl) {
    throw new Error('Stripped URL is empty during reconstruction');
  }
  return reconstructedUrl;
}

dynamoose.Table.defaults.set({
  throughput: 'ON_DEMAND',
});

const CounterSchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,
    default: 'urlCounter',
  },
  count: {
    type: Number,
    required: true,
    default: 0,
  },
});

const CounterModel = dynamoose.model('shtyMe_Counter', CounterSchema);

const UrlSchema = new dynamoose.Schema({
  shortCode: {
    type: String,
    hashKey: true,
  },
  prefix: {
    type: String, 
    required: true,
  },
  strippedUrl: {
    type: String,
    required: true,
  },
  suffix: {
    type: String, 
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  expirationDate: {
    type: Date,
    required: false,
  },
  clicks: {
    type: Number,
    default: 0,
  },
});

const UrlModel = dynamoose.model('shtyMe_Urls', UrlSchema);

export async function generateUniqueShortCode(): Promise<string> {
    const reusableCode = await ReusableCodeModel.scan().limit(1).exec();
    if (reusableCode.count > 0) {
      const codeToReuse = reusableCode[0].shortCode;
      await ReusableCodeModel.delete({ shortCode: codeToReuse });
      console.log(`[DEBUG] Reusing short code: ${codeToReuse}`);
      return codeToReuse;
    }
  
    let isUnique = false;
    let shortCode = '';
    while (!isUnique) {
      const counter = await CounterModel.update(
        { id: 'urlCounter' },
        { $ADD: { count: 1 } }
      );
  
      shortCode = encodeBase62(counter.count);
      const existingUrl = await UrlModel.get({ shortCode });
      if (!existingUrl) {
        isUnique = true;
      }
    }
    console.log(`[DEBUG] Generated new short code: ${shortCode}`);
    return shortCode;
  }
  

export async function createShortUrl(
    originalUrl: string,
    userId: string | null = null,
    expirationDate: Date | null = null,
    customShortCode?: string 
  ): Promise<{
    shortCode: string;
    prefix: string;
    strippedUrl: string;
    suffix: string;
    userId?: string | null;
    expirationDate?: Date | null;
    clicks: number;
  }> {
    try {
      console.log(`[DEBUG] Original URL Received: ${originalUrl}`);
  
      let shortCode = customShortCode;
  
      if (!shortCode) {
        shortCode = await generateUniqueShortCode();
      } else {
        const existingUrl = await UrlModel.get({ shortCode });
        if (existingUrl) {
          console.error(`[ERROR] Short code "${shortCode}" already exists.`);
          throw new Error(`Short code "${shortCode}" is already in use.`);
        }
      }
  
      console.log(`[DEBUG] Short code generated or provided: ${shortCode}`);
  
      const { prefix, strippedUrl, suffix } = extractPrefixSuffix(originalUrl);

      if (!strippedUrl) {
        console.error(`[ERROR] Stripped URL is empty. Original URL: ${originalUrl}`);
        throw new Error('Failed to extract stripped URL from the original URL.');
      }
      
      console.log(`[DEBUG] Processed URL -> Prefix: ${prefix}, Stripped URL: ${strippedUrl}, Suffix: ${suffix}`);
  
      const newUrl = await UrlModel.create({
        shortCode,
        prefix,
        strippedUrl,
        suffix,
        userId,
        expirationDate,
      });
  
      console.log(`[DEBUG] URL saved to database: ${JSON.stringify(newUrl)}`);
  
      return {
        shortCode: newUrl.shortCode,
        prefix: newUrl.prefix,
        strippedUrl: newUrl.strippedUrl,
        suffix: newUrl.suffix,
        userId: newUrl.userId || null,
        expirationDate: newUrl.expirationDate || null,
        clicks: newUrl.clicks,
      };
    } catch (error) {
        if (error instanceof Error) {
          console.error(`[ERROR] Failed to create short URL: ${error.message}`);
          throw new Error(`Failed to create short URL: ${error.message}`);
        } else {
          console.error(`[ERROR] Unknown error occurred.`);
          throw new Error('An unknown error occurred while creating the short URL.');
        }
      }
    }
  
export async function getOriginalUrl(shortCode: string): Promise<string> {
  const urlEntry = await UrlModel.get({ shortCode });
  if (!urlEntry) throw new Error('Short URL not found');

  return reconstructUrl(urlEntry.prefix, urlEntry.strippedUrl, urlEntry.suffix);
}
