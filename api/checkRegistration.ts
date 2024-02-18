import { useCallback } from "react";

const checkRegistration = async (firstName: string, lastName: string, month: string, day: string, year: string, zipCode: string) => {

    try {
      const requestBody = {
        firstName: firstName,
        lastName: lastName,
        month: convertMonthToNumber(month),
        day: day,
        year: year,
        zipCode: zipCode,
      };

      const response = await fetch('http://10.243.37.10:4321/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      console.log('Data from server:', data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }


  };

const convertMonthToNumber = (monthName: string) => {
    switch (monthName.toLowerCase()) {
      case 'january':
        return '1';
      case 'february':
        return '2';
      case 'march':
        return '3';
      case 'april':
        return '4';
      case 'may':
        return '5';
      case 'june':
        return '6';
      case 'july':
        return '7';
      case 'august':
        return '8';
      case 'september':
        return '9';
      case 'october':
        return '10';
      case 'november':
        return '11';
      case 'december':
        return '12';
      default:
        return '0';
    }
  };
  
  export default checkRegistration;