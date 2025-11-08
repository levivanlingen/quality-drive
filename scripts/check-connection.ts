import prisma from '../lib/prisma';

async function checkConnection() {
  const db = await prisma.$queryRaw<any[]>`SELECT current_database(), current_user`;
  console.log('🔗 App is connected to database:', db[0].current_database);
  console.log('   User:', db[0].current_user);

  // Check if it's Railway or Replit
  if (db[0].current_database === 'railway') {
    console.log('✅ Using RAILWAY database (correct!)');
  } else if (db[0].current_database === 'heliumdb') {
    console.log('⚠️  Using REPLIT database (heliumdb) - NOT Railway!');
  } else {
    console.log('❓ Using unknown database');
  }

  await prisma.$disconnect();
}

checkConnection();
