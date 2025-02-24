function md2html(id){
   let md_text = document.getElementById(id).innerHTML;
   let html_text = marked.parse(md_text);
   document.getElementById(id).innerHTML = html_text;
}
