$(document).ready(()=>{


  $(function() {
    const $button = $('.addOption');
    //catches user input
    $button.on('submit', (event) => {

      event.preventDefault();
        let $option = $( `<div><textarea id="optionBox" name="option" placeholder="Enter option"></textarea><textarea id="optionBox" name="description" placeholder="Description"></textarea></div>`);
        $('.optionBox').append($option);
      });
    });
})
