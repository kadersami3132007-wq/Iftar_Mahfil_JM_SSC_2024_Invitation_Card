// আপনার নতুন জেনারেট করা Apps Script URL
const scriptURL = 'https://script.google.com/macros/s/AKfycbzwJww2pFV6n4A4U-Mosz6AcgqyIg7q7at3MAzzGb301yuRWNdauvLx3weHyYaV8LMW/exec';

async function generateCard() {
    const phoneInput = document.getElementById('phoneInput').value.trim();
    const btn = document.querySelector('button');
    
    if(phoneInput.length < 11) { 
        alert("বন্ধু, সঠিক ১১ ডিজিটের মোবাইল নম্বরটি দাও।"); 
        return; 
    }
    
    // লোডিং অবস্থা দেখানো
    btn.innerText = "যাচাই করা হচ্ছে...";
    btn.disabled = true;

    try {
        const response = await fetch(`${scriptURL}?phone=${phoneInput}`);
        const result = await response.json();

        if (result === "Not Found") {
            alert("দুঃখিত! এই নম্বরটি আমাদের তালিকায় নেই অথবা নম্বরটি ভুল হয়েছে।");
        } else {
            drawCard(result.name, result.group, phoneInput, "Confirmed");
            document.getElementById('card-container').style.display = 'block';
        }
    } catch (error) {
        alert("সার্ভারে সমস্যা হচ্ছে। দয়া করে কিছুক্ষণ পর আবার চেষ্টা করো।");
        console.error(error);
    } finally {
        btn.innerText = "কার্ড তৈরি করুন";
        btn.disabled = false;
    }
}

function drawCard(name, group, phone, status) {
    const canvas = document.getElementById('inviteCanvas');
    const ctx = canvas.getContext('2d');

    // ব্যাকগ্রাউন্ড ডিজাইন (Royal Blue)
    ctx.fillStyle = '#1a237e';
    ctx.fillRect(0, 0, 800, 500);
    
    // সোনালী বর্ডার
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 20;
    ctx.strokeRect(10, 10, 780, 480);

    // শিরোনাম
    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 45px Arial';
    ctx.textAlign = "center";
    ctx.fillText("🌙 ইফতার মাহফিল ২০২৬", 400, 80);
    
    ctx.font = '22px Arial';
    ctx.fillText("এসএসসি ব্যাচ ২০২৪ | ময়মনসিংহ", 400, 120);

    // তথ্যগুলো (বাম দিক থেকে)
    ctx.textAlign = "left";
    ctx.fillStyle = 'white';
    ctx.font = 'bold 35px Arial';
    ctx.fillText("নাম: " + name, 80, 220);
    
    ctx.font = '28px Arial';
    ctx.fillText("গ্রুপ: " + group, 80, 280);
    ctx.fillText("মোবাইল: " + phone, 80, 330);
    
    // স্ট্যাটাস
    ctx.fillStyle = '#2ecc71';
    ctx.font = 'bold 30px Arial';
    ctx.fillText("স্ট্যাটাস: " + status, 80, 400);

    // নিচের মেসেজ
    ctx.fillStyle = '#bdc3c7';
    ctx.font = 'italic 20px Arial';
    ctx.fillText("আপনার উপস্থিতি কাম্য - সামি ও বন্ধুরা", 80, 450);
}

function downloadCard() {
    const canvas = document.getElementById('inviteCanvas');
    const link = document.createElement('a');
    link.download = 'Iftar_Invitation_2026.png';
    link.href = canvas.toDataURL();
    link.click();
}
