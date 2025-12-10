const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Error: Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createAdmin() {
    const email = 'admin@multitech.pro';
    const password = 'admin-password-123'; // Default password, change immediately
    const username = 'admin';

    console.log(`Creating admin user: ${username} (${email})...`);

    const { data, error } = await supabase.auth.admin.createUser({
        email: email,
        password: password,
        email_confirm: true,
        user_metadata: { username: username }
    });

    if (error) {
        console.error('Error creating user:', error.message);
    } else {
        console.log('User created successfully!');
        console.log('User ID:', data.user.id);
        console.log('-----------------------------------');
        console.log('credentials:');
        console.log('Username:', username);
        console.log('Password:', password);
        console.log('-----------------------------------');
        console.log('Please login and change your password if needed.');
    }
}

createAdmin();
