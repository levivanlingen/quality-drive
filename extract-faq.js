const fs = require('fs');

// Lees het bestand
const data = JSON.parse(fs.readFileSync('/home/runner/workspace/data/pages.json', 'utf8'));

// Zoek de homepage
const homepage = data.find(page => page.original_url === 'https://quality-drive.nl');

if (homepage) {
    const content = homepage.content;

    // Zoek naar FAQ sectie
    if (content.includes('Veelgestelde vragen')) {
        console.log('FAQ gevonden!');
        console.log('='.repeat(50));

        // Extract FAQ items met regex
        const toggleRegex = /<div class="elementor-tab-title"[^>]*>(.*?)<\/div>[\s\S]*?<div[^>]*class="elementor-tab-content"[^>]*>([\s\S]*?)<\/div>/g;

        let match;
        let count = 1;
        const faqs = [];

        while ((match = toggleRegex.exec(content)) !== null && count <= 10) {
            let question = match[1].replace(/<[^>]*>/g, '').trim();
            let answer = match[2].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();

            if (question && answer && question.length > 5) {
                faqs.push({ question, answer });
                console.log('\nQ' + count + ': ' + question);
                console.log('A' + count + ': ' + answer.substring(0, 300));
                count++;
            }
        }

        if (faqs.length === 0) {
            console.log('\nGeen FAQ items gevonden');
        } else {
            // Output als JSON
            console.log('\n' + '='.repeat(50));
            console.log('FAQ als JSON:');
            console.log(JSON.stringify(faqs.slice(0, 8), null, 2));
        }
    } else {
        console.log('Geen "Veelgestelde vragen" gevonden');
    }
} else {
    console.log('Homepage niet gevonden');
}
