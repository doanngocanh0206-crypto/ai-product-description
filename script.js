async function generate(){

let product = document.getElementById("product").value
let features = document.getElementById("features").value
let benefits = document.getElementById("benefits").value
let keywords = document.getElementById("keywords").value

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
- có bullet point tính năng
- có đoạn văn marketing
- tích hợp SEO tự nhiên
`

try{

let response = await fetch(
"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCIzre6mt6hI96DrDjpV7upn6kJg7wKfpA",
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
})

let data = await response.json()

console.log(data)

let text = data.candidates[0].content.parts[0].text

document.getElementById("result").innerText = text

}catch(error){

console.error(error)

document.getElementById("result").innerText = "Lỗi khi gọi AI"

}

}