export default function formatValue(value) {
    if (value == null || value === '') return '-';

    let date;
    
    if (value instanceof Date && !isNaN(value)) {
        date = value;
    } else if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {

        date = new Date(value + 'T00:00:00Z'); 
    } else {
        date = new Date(value);
    }

    if (!isNaN(date.getTime())) {

        const day = String(date.getUTCDate()).padStart(2, '0');   
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); 
        const year = date.getUTCFullYear();                      
        return `${day}/${month}/${year}`;
    }
    
    return value || '-';
}