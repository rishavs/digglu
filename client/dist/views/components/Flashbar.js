let Flashbar = {
    render: async function () {
        let view =  /*html*/`
            <div id="flashbar" class="hidden flex justify-between h-14 mx-16 px-16 rounded-b-md bg-danger-light items-center ">
                <p class="text-gray-200 text-l"> 
                    <span class="animate-pulse">💀</span> 
                    <span id="flashbar_text">Some error message goes here</span>
                </p>
                <button id="hide_flash_btn" class="text-gray-200 px-2 py-1 border rounded-md">✕</button>
            </div>
        `
        return view
    },
    control: async function () { 
        document.getElementById("hide_flash_btn").addEventListener('click', async (e) => {
            document.getElementById("flashbar").classList.toggle('hidden')
        })

    }

}

export default Flashbar;