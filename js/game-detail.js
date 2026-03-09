const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const title = document.getElementById('title');
title.innerHTML