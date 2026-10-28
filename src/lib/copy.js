import { toast } from './toast';

export async function copyText(text, message = 'Copied to clipboard') {
  try {
    await navigator.clipboard.writeText(text);
    toast(message, 'success');
  } catch (e) {
    toast(`Couldn't copy. It's ${text}`, 'error');
  }
}
