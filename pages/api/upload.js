import multiparty from 'multiparty';
import mime from 'mime-types';
import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

const bucketName = 'files';

export default async function handle(req, res) {
  await MongooseConnect();
  await isAdminRequest(req,res)

  
  const supabase = createClient(
    process.env.SUPABASE_PROJECT_URL,
    process.env.SUPABASE_PROJECT_ANON_KEY
  );

  const form = new multiparty.Form();
  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });

  {/*console.log('length: ', files);*/}

  const links = [];
  for (const file of files.file) {
    const ext = file.originalFilename.split('.').pop();
    const newFilename = Date.now() + '.' + ext;

    const { data, error } = await supabase.storage.from(bucketName).upload(newFilename, fs.createReadStream(file.path), {
      contentType: mime.lookup(file.path),
      cacheControl: 'public, max-age=31536000', // You can adjust cache control as needed
    });

    if (error) {
      console.error('Error uploading file:', error);
    } else {
      const link = `https://yrlkhvguoskiuyeqzbvn.supabase.co/storage/v1/object/public/${bucketName}/${newFilename}`;
      links.push(link);
    }
  }
  return res.json({links});
}

export const config = {
  api: { bodyParser: false },
};
