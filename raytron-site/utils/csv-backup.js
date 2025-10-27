import fs from 'fs';
import { stringify } from 'csv-stringify/sync';

const CSV_PATH = process.env.CSV_PATH || '/tmp/website-leads.csv';

export async function appendToCsv(record) {
  const headers = ['timestamp','company','contact','email','message','source'];
  const row = [new Date().toISOString(), record.company, record.contact, record.email, record.message || '', record.source || 'website'];
  const exists = fs.existsSync(CSV_PATH);
  const csv = (exists ? '' : stringify([headers])) + stringify([row]);
  await fs.promises.appendFile(CSV_PATH, csv, 'utf8');
  return CSV_PATH;
}
