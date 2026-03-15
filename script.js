const API_KEY = process.env.GEMINI_API_KEY;
async function generate(){

let product = document.getElementById("product").value;
let features = document.getElementById("features").value;
let benefits = document.getElementById("benefits").value;
let keywords = document.getElementById("keywords").value;

let prompt = `
Viết mô tả sản phẩm thương mại điện tử hấp dẫn.

Tên sản phẩm: ${product}

Tính năng:
${features}

Lợi ích:
${benefits}

Từ khóa SEO:
${keywords}

Yêu cầu:
- Có bullet point cho tính năng
- Có đoạn văn marketing
- Tích hợp từ khóa SEO tự nhiên
`;

try{

let response = await fetch(
`https://generativelanguage.googleapis.com/v1beta/models/gemini:generateContent?key=${API_KEY}`,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
contents:[
{
parts:[
{ text: prompt }
]
}
]
})
}
);

let data = await response.json();

console.log(data);

let text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Không tạo được mô tả";

document.getElementById("result").innerText = text;

}catch(error){

console.error(error);

document.getElementById("result").innerText = "Lỗi khi gọi AI";

}

}

function copyText(){

let text = document.getElementById("result").innerText;

navigator.clipboard.writeText(text);

alert("Đã copy mô tả");

}