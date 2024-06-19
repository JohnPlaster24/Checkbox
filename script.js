function updateTextBox() {
    let selected = [];
    let counts = { high: 0, medium: 0 };
    const categories = ['high', 'medium'];

    for (let i = 1; i <= 5; i++) {
        let checkbox = document.getElementById('option' + i);
        if (checkbox.checked) {
            let optionLabel = checkbox.parentNode.textContent.trim();
            selected.push(optionLabel);
            let row = checkbox.parentNode.parentNode;
            let category = row.cells[0].className;
            counts[category]++;
        }
    }

    let summary = categories.map(cat => `${cat.charAt(0).toUpperCase() + cat.slice(1)} - ${counts[cat]}`).join(', ');
    document.getElementById('selectedOptions').value = `${summary} : ${selected.join(', ')}`;
}

function copyToClipboard() {
    let copyText = document.getElementById('selectedOptions');
    copyText.select();
    document.execCommand('copy');
}

function resetOptions() {
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    updateTextBox();
    window.scrollTo(0, 0);
}

function toggleColumn(columnName) {
    const columnIndex = {
        "description": 2,
        "logic": 3
    }[columnName];

    const hideColumn = document.getElementById(`hide${columnName.charAt(0).toUpperCase() + columnName.slice(1)}`).checked;
    const table = document.getElementById('optionsTable');

    if (table) {
        const rows = table.querySelectorAll('tr');
        rows.forEach(row => {
            const cells = row.cells;
            if (cells.length > columnIndex) {
                cells[columnIndex].style.display = hideColumn ? 'none' : '';
            }
        });
    }
}
