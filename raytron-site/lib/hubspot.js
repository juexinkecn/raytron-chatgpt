import fetch from 'node-fetch';

export async function submitToHubspot(portalId, formId, payload) {
  if (!portalId || !formId) throw new Error('HubSpot portalId/formId required');
  const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return res;
}
