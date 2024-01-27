export const statusColorSelector = (status)=>{
    switch (status) {
        case 'pending':
         return 'red';
          
        case 'shipped':
         return 'yellow';
          
        case 'delivered':
         return 'green';

        case 'completed':
         return 'green';
          
        default:
         return 'black'; // Set a default color if the status doesn't match any case
          
      }
}