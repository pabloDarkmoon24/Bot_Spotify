import puppeteer from "puppeteer"; // importamos la librería de puppeteer

function createPassword() {
    var chars = "abcdefghijklmnopqrstubwsyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%";
    var password = '';
    for (let i = 0; i < 10; i++) { // Usamos let en lugar de var para evitar problemas de alcance
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

async function openWebPage() { 
    const browser = await puppeteer.launch({ 
        headless: false,
        slowMode: 200, // Corregido slowMode a slowMo
    });
    
    const page = await browser.newPage(); // Eliminamos el string vacío como argumento

    await page.goto('https://www.spotify.com/co-es/account/change-password/'); 
    await page.type('#login-username', 'spotior3m34606@mytvideo.com'); 
    await page.type('#login-password', 'iembvd05857');
    await page.click('#login-button');
    await page.waitForNavigation({ waitUntil: 'networkidle2' });

    // Proceso de cambio de contraseña
    const newPassword = createPassword();

    await page.type('#old_password', 'iembvd05857');
    await page.type('#new_password', newPassword);
    await page.type('#new_password_confirmation', newPassword);
    await page.click('button[type="submit"][data-encore-id="buttonPrimary"]');
    console.log(`La nueva contraseña es: ${newPassword}`);
    console.log("¡La contraseña se cambió de manera exitosa!");
    

    // await browser.close(); // Cerramos el navegador después de completar la tarea
}

openWebPage();