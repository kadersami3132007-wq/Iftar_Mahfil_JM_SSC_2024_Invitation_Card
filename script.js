const scriptURL = 'https://script.google.com/macros/s/AKfycbzxVRXoPgov73Ma9EbbM91PdUWI7JBJGkRKoSz8OXfo8h4NPiOOn_HowbtmeHEk9iJX/exec';

async function generateCard() {
    const phoneInput = document.getElementById('phoneInput').value.trim();
    const btn = document.querySelector('button');
    
    if(phoneInput.length < 11) { 
        alert("বন্ধু, সঠিক ১১ ডিজিটের মোবাইল নম্বরটি দাও।"); 
        return; 
    }
    
    btn.innerText = "যাচাই করা হচ্ছে...";
    btn.disabled = true;
    document.getElementById('card-container').style.display = 'none';

    try {
        const response = await fetch(`${scriptURL}?phone=${phoneInput}`);
        const text = await response.text();

        if (text === "Not Found") {
            alert("দুঃখিত! এই নম্বরটি আমাদের তালিকায় নেই।");
        } else if (text === "C") {
            alert("দুঃখিত, আপনার রেজিষ্ট্রেশনটি বাতিল করা হয়েছে।");
        } else if (text === "Pending") {
            alert("আপনার রেজিষ্ট্রেশনটি বর্তমানে প্রক্রিয়াধীন রয়েছে।");
        } else {
            const result = JSON.parse(text);
            drawCard(result.name, result.group, phoneInput);
            document.getElementById('card-container').style.display = 'block';
        }
    } catch (error) {
        alert("সার্ভারে সমস্যা হচ্ছে। পরে চেষ্টা করো।");
    } finally {
        btn.innerText = "কার্ড তৈরি করুন";
        btn.disabled = false;
    }
}

function drawCard(name, group, phone) {
    const canvas = document.getElementById('inviteCanvas');
    const ctx = canvas.getContext('2d');

    // ১. ব্যাকগ্রাউন্ড: গাঢ় নীল থেকে হালকা নীলের গ্রাডিয়েন্ট
    const grd = ctx.createLinearGradient(0, 0, 0, 500);
    grd.addColorStop(0, "#0a192f"); // Deep Navy Blue
    grd.addColorStop(1, "#172a45"); 
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 800, 500);

    // ২. মসজিদের সিলুয়েট (নিচের দিকে আবছা ছায়া)
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = "#ffffff";
    // মাঝের বড় ডোম
    ctx.beginPath();
    ctx.arc(400, 500, 200, Math.PI, 0);
    ctx.fill();
    // দুই পাশের মিনার
    ctx.fillRect(150, 300, 40, 200);
    ctx.fillRect(610, 300, 40, 200);
    ctx.globalAlpha = 1.0;

    // ৩. লণ্ঠন (Lanterns)
    function drawLantern(x, y) {
        ctx.fillStyle = "#ffcc33"; // Golden Glow
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x-15, y+20);
        ctx.lineTo(x-15, y+50);
        ctx.lineTo(x+15, y+50);
        ctx.lineTo(x+15, y+20);
        ctx.closePath();
        ctx.fill();
        // লণ্ঠনের দড়ি
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, y); ctx.stroke();
    }
    drawLantern(100, 80);
    drawLantern(700, 80);

    // ৪. টেক্সট এরিয়া (সেন্ট্রাল টাইটেল)
    ctx.textAlign = "center";
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px Arial';
    ctx.fillText("JMian 108th • SSC Batch 2024", 400, 50);

    ctx.fillStyle = '#ffcc33';
    ctx.font = 'italic 30px Georgia';
    ctx.fillText("Ramadan Kareem", 400, 100);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 60px Arial';
    ctx.fillText("IFTAR MAHFIL", 400, 160);

    // ৫. ব্যক্তিগত তথ্য
    ctx.textAlign = "center";
    ctx.font = 'bold 35px Arial';
    ctx.fillStyle = '#ffcc33';
    ctx.fillText(name, 400, 250);
    
    ctx.font = '22px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.fillText("Group: " + group, 400, 290);
    ctx.fillText("Phone: " + phone, 400, 320);

    // ৬. তারিখ ও স্থান
    ctx.font = 'bold 28px Arial';
    ctx.fillText("18th March, 26", 400, 380);
    ctx.font = '18px Arial';
    ctx.fillText("Central Playground of Jogotmoni", 400, 410);

    // ৭. ভেরিফাইড সিল
    ctx.fillStyle = '#2ecc71';
    ctx.font = 'bold 20px Arial';
    ctx.fillText("Verified Invitation ✅", 400, 460);
}
