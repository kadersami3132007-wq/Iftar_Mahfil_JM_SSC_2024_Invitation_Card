function generateCard() {
    const phone = document.getElementById('phoneInput').value;
    if(phone.length < 11) { alert("সঠিক নম্বর দিন"); return; }
    
    document.getElementById('card-container').style.display = 'block';
    const canvas = document.getElementById('inviteCanvas');
    const ctx = canvas.getContext('2d');

    // কালার ব্যাকগ্রাউন্ড
    ctx.fillStyle = '#1e3a8a';
    ctx.fillRect(0, 0, 800, 500);
    
    // টেক্সট
    ctx.fillStyle = 'white';
    ctx.font = 'bold 40px Arial';
    ctx.fillText("IFTAR MAHFIL 2026", 200, 100);
    ctx.font = '30px Arial';
    ctx.fillText("Phone: " + phone, 100, 250);
    ctx.fillText("Status: CONFIRMED", 100, 300);
}

function downloadCard() {
    const canvas = document.getElementById('inviteCanvas');
    const link = document.createElement('a');
    link.download = 'Invitation_Card.png';
    link.href = canvas.toDataURL();
    link.click();
}
