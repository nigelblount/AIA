import Fastify from 'fastify';
import formbody from '@fastify/formbody';
import cookie from '@fastify/cookie';
import view from '@fastify/view';
import ejs from 'ejs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = Fastify({ logger: true });
await app.register(formbody);
await app.register(cookie, { secret: process.env.AIA_COOKIE_SECRET ?? 'change-me' });
await app.register(view, { engine: { ejs }, root: path.join(__dirname, 'views'), viewExt: 'ejs' });

// TEMP auth: password in env; will be hashed + persisted in v0.1
const PASSWORD = process.env.AIA_PASSWORD ?? '';

app.get('/healthz', async () => ({ ok: true }));

app.addHook('preHandler', async (req, reply) => {
  if (req.url.startsWith('/healthz') || req.url.startsWith('/login')) return;
  if (req.cookies?.aia_session === '1') return;
  return reply.redirect('/login');
});

app.get('/login', async (req, reply) => reply.view('login', { error: '' }));

app.post('/login', async (req, reply) => {
  const { password = '' } = req.body ?? {};
  if (!PASSWORD) return reply.code(500).view('login', { error: 'Server password not set.' });
  if (String(password) !== PASSWORD) return reply.code(401).view('login', { error: 'Invalid password.' });
  reply.setCookie('aia_session', '1', { path: '/', httpOnly: true, sameSite: 'lax' });
  return reply.redirect('/');
});

app.get('/', async (req, reply) => {
  return reply.view('index', { nowIso: new Date().toISOString() });
});

const host = process.env.HOST ?? '127.0.0.1';
const port = Number(process.env.PORT ?? 3190);
await app.listen({ host, port });
