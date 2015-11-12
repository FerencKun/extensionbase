if (document.body) {
    document.body.setAttribute('data-bw-id', '1');
} else {
    window.setTimeout(function(){
        document.body.setAttribute('data-bw-id', '1');
    }, 1000);
}