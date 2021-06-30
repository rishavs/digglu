let Progressbar = {
    render: async function () {
        let view =  /*html*/`
            <div id="progressbar" class="fixed w-0 h-2 bg-yellow-400 z-50"></div>
            <progress id="file" class="fixed w-full h-4 bg-blue-200 z-10" value="12" max="100"> 32% </progress>
        `
        return view
    },
    control: async function () { 
        // reset the progress bar to 0 when trasition is over
        document.getElementById('progressbar').addEventListener("transitionend", () => {
            const progressBar = document.getElementById('progressbar');
            // The "If" clause here causes the bar to reset only when the width is 100%
            if (progressBar.style.width == '100%') {
                progressBar.style.visibility = "hidden";
                progressBar.style.width = '0%';
            }
        });  

        window.addEventListener('hashchange', this.animate('60%', '1.5s'));

    },

    animate: async function(percentage, speed) {
        const progressBar = document.getElementById('progressbar');
        progressBar.style.transition=`width ${speed}`; 
        progressBar.style.visibility = 'visible';
        progressBar.style.width = `${percentage}`;
    }

}

export default Progressbar;