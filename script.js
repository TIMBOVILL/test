function navigate() {
    const selector = document.getElementById('pageSelector');
    const selectedPage = selector.value;
    window.location.href = selectedPage; // Redirect to the selected page
}

function redirectToPage() {
    // Set the URL to which you want to redirect when the button is clicked
    const targetURL = "your-target-page.html"; 
    window.location.href = targetURL;
}

document.addEventListener('DOMContentLoaded', () => {
    const customSelect = document.querySelector('.custom-select');
    const selectElement = customSelect.querySelector('select');
    const selected = document.createElement('div');
    selected.className = 'select-selected';
    selected.innerHTML = `<img src="${selectElement.options[selectElement.selectedIndex].getAttribute('data-icon')}" style="width: 20px; height: 20px;"/>${selectElement.options[selectElement.selectedIndex].innerHTML}`;
    customSelect.appendChild(selected);

    const options = document.createElement('div');
    options.className = 'select-items select-hide';
    for (let i = 0; i < selectElement.length; i++) {
        const option = document.createElement('div');
        option.innerHTML = `<img src="${selectElement.options[i].getAttribute('data-icon')}" style="width: 20px; height: 20px;"/>${selectElement.options[i].innerHTML}`;
        option.addEventListener('click', function() {
            const sameAsSelected = this.parentNode.querySelector('.same-as-selected');
            if (sameAsSelected) sameAsSelected.removeAttribute('class');
            this.className = 'same-as-selected';
            selected.innerHTML = this.innerHTML;
            selectElement.selectedIndex = i;
            selectElement.dispatchEvent(new Event('change'));
            selected.click();
        });
        options.appendChild(option);
    }
    customSelect.appendChild(options);

    selected.addEventListener('click', function(e) {
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle('select-hide');
        this.classList.toggle('select-arrow-active');
    });

    document.addEventListener('click', closeAllSelect);
});

function closeAllSelect(elmnt) {
    const items = document.querySelectorAll('.select-items');
    const selectedItems = document.querySelectorAll('.select-selected');

    items.forEach((item, index) => {
        if (elmnt !== selectedItems[index]) {
            item.classList.add('select-hide');
            selectedItems[index].classList.remove('select-arrow-active');
        }
    });
}