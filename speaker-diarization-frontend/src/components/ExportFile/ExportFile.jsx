import * as XLSX from 'xlsx';

const exportData = (data) => {
    if (!data || data.length === 0) {
        alert("No data to export");
    }
    else {

        // Convert data to an Excel sheet
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'SpeakersData');

        // Generate file and trigger download
        const fileName = 'speakers_data.xlsx';
        XLSX.writeFile(wb, fileName);
    }
    console.log("here in component")
};

export default exportData;
