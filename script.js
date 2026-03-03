// আপনার নতুন জেনারেট করা Apps Script URL
const scriptURL = 'https://script.google.com/macros/s/AKfycbzxVRXoPgov73Ma9EbbM91PdUWI7JBJGkRKoSz8OXfo8h4NPiOOn_HowbtmeHEk9iJX/exec';

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
    document.getElementById('card-container').style.display = 'none';

    try {
        const response = await fetch(`${scriptURL}?phone=${phoneInput}`);
        const text = await response.text();

        if (text === "Not Found") {
            alert("দুঃখিত! এই নম্বরটি আমাদের তালিকায় নেই।");
        } else if (text === "C") {
            alert("দুঃখিত, আপনার রেজিষ্ট্রেশনটি বাতিল (Cancel) করা হয়েছে।");
        } else if (text === "Pending") {
            alert("আপনার রেজিষ্ট্রেশনটি বর্তমানে প্রক্রিয়াধীন রয়েছে। দয়া করে অপেক্ষা করুন।");
        } else {
            // ডাটা পাওয়া গেলে কার্ড তৈরি করা
            const result = JSON.parse(text);
            drawCard(result.name, result.group, phoneInput);
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

function drawCard(name, group, phone) {
    const canvas = document.getElementById('inviteCanvas');
    const ctx = canvas.getContext('2d');

    // ১. প্রিমিয়াম ইসলামিক ব্যাকগ্রাউন্ড (Deep Green Gradient)
    const grd = ctx.createLinearGradient(0, 0, 800, 500);
    grd.addColorStop(0, "#004d40"); 
    grd.addColorStop(1, "#002d26"); 
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 800, 500);
    
    // ২. জলরং মসজিদের আর্ট (Watermark Effect)
    ctx.globalAlpha = 0.1;
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(400, 450, 250, Math.PI, 0); 
    ctx.fill();
    ctx.globalAlpha = 1.0;

    // ৩. সোনালী চাঁদ ও তারা ডিজাইন
    ctx.fillStyle = "#ffd700";
    ctx.beginPath();
    ctx.arc(100, 100, 45, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#004d40"; 
    ctx.beginPath();
    ctx.arc(125, 100, 45, 0, Math.PI * 2);
    ctx.fill(); // Crescent Moon

    // ৪. রাজকীয় সোনালী ডাবল বর্ডার
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 12;
    ctx.strokeRect(15, 15, 770, 470);
    ctx.lineWidth = 2;
    ctx.strokeRect(35, 35, 730, 430);

    // ৫. শিরোনাম
    ctx.textAlign = "center";
    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 55px Arial';
    ctx.fillText("🌙 ইফতার মাহফিল ২০২৬", 400, 120);
    
    ctx.font = '24px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.fillText("এসএসসি ব্যাচ ২০২৪ | ময়মনসিংহ", 400, 165);

    // ৬. তথ্যাবলি প্রদর্শন
    ctx.textAlign = "left";
    ctx.font = 'bold 42px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.fillText("নাম: " + name, 100, 265);
    
    ctx.font = '32px Arial';
    ctx.fillStyle = '#ffd700';
    ctx.fillText("গ্রুপ: " + group, 100, 330);
    ctx.fillText("মোবাইল: " + phone, 100, 385);
    
    // ৭. ভেরিফাইড স্ট্যাটাস ✅
    ctx.fillStyle = '#2ecc71';
    ctx.font = 'bold 30px Arial';
    ctx.fillText("Status: Verified ✅", 100, 445);
}

function downloadCard() {
    const canvas = document.getElementById('inviteCanvas');
    const link = document.createElement('a');
    link.download = 'Iftar_Invitation_2026.png';
    link.href = canvas.toDataURL();
    link.click();
}
