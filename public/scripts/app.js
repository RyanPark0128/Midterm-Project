$(document).ready(()=>{


  $(function() {
    const $button = $('.addOption');
    //catches user input
    $button.on('submit', (event) => {

      event.preventDefault();
        let $option = $( `<div><textarea id="optionBox" name="option" placeholder="Enter option"></textarea></div>`);
        $('.optionBox').append($option);
      });
    });
})
