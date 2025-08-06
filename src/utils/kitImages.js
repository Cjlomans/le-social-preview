// Function to get all images for a specific kit
export const getKitImages = (kitId) => {
  const baseUrl = '/images/kits/';
  
  switch(kitId) {
    case 'black':
      return [
        `${baseUrl}black/Black Kit Image 1.webp`,
        `${baseUrl}black/Black Kit Image 2_.webp`,
        `${baseUrl}black/Black Kit Image 3.webp`,
        `${baseUrl}black/Black Kit Image 4.webp`,
        `${baseUrl}black/Black Kit Image 5.webp`,
        `${baseUrl}black/Black Kit Image 6.webp`,
        `${baseUrl}black/Black Kit Image 7.webp`,
        `${baseUrl}black/Black Kit Image 8.webp`,
        `${baseUrl}black/Black Kit Image 9.webp`,
        `${baseUrl}black/Black Kit Image 10.webp`,
        `${baseUrl}black/Black Kit Image 11.webp`,
        `${baseUrl}black/Black Kit Image 12.webp`,
        `${baseUrl}black/Black Kit Image 13.webp`,
        `${baseUrl}black/Black Kit Image 14.webp`,
        `${baseUrl}black/Black Kit Image 15.webp`,
        `${baseUrl}black/Black Kit Image 16.webp`,
        `${baseUrl}black/Black Kit Image 17.webp`,
        `${baseUrl}black/Black Kit Image 18.webp`,
        `${baseUrl}black/Black Kit Image 19.webp`,
        `${baseUrl}black/Black Kit Image 20.webp`
      ];
    
    case 'floral':
      return [
        `${baseUrl}floral/Floral Kit Image 1.webp`,
        `${baseUrl}floral/Floral Kit Image 2.webp`,
        `${baseUrl}floral/Floral Kit Image 3.webp`,
        `${baseUrl}floral/Floral Kit Image 4.webp`,
        `${baseUrl}floral/Floral Kit Image 5.webp`,
        `${baseUrl}floral/Floral Kit Image 6.webp`,
        `${baseUrl}floral/Floral Kit Image 7.webp`,
        `${baseUrl}floral/Floral Kit Image 8.webp`,
        `${baseUrl}floral/Floral Kit Image 9.webp`,
        `${baseUrl}floral/Floral Kit Image 10.webp`,
        `${baseUrl}floral/Floral Kit Image 11.webp`,
        `${baseUrl}floral/Floral Kit Image 12.webp`,
        `${baseUrl}floral/Floral Kit Image 13.webp`,
        `${baseUrl}floral/Floral Kit Image 14.webp`,
        `${baseUrl}floral/Floral Kit Image 15.webp`,
        `${baseUrl}floral/Floral Kit Image 16.webp`,
        `${baseUrl}floral/DSC00395.webp`,
        `${baseUrl}floral/DSC00413.webp`
      ];
    
    case 'white':
      return [
        `${baseUrl}white/WhiteKitImage1.webp`,
        `${baseUrl}white/WhiteKitImage2.webp`,
        `${baseUrl}white/WhiteKitImage3.webp`,
        `${baseUrl}white/WhiteKitImage4.webp`,
        `${baseUrl}white/WhiteKitImage5.webp`,
        `${baseUrl}white/WhiteKitImage6.webp`,
        `${baseUrl}white/WhiteKitImage7.webp`,
        `${baseUrl}white/WhiteKitImage9.webp`,
        `${baseUrl}white/WhiteKitImage10.webp`,
        `${baseUrl}white/WhiteKitImage11.webp`,
        `${baseUrl}white/WhiteKitImage12.webp`,
        `${baseUrl}white/WhiteKitImage13.webp`,
        `${baseUrl}white/WhiteKitImage14.webp`,
        `${baseUrl}white/WhiteKitImage15.webp`,
        `${baseUrl}white/WhiteKitImage16.webp`,
        `${baseUrl}white/WhiteKitImage17.webp`,
        `${baseUrl}white/WhiteKitImage19.webp`,
        `${baseUrl}white/WhiteKitImage20.webp`,
        `${baseUrl}white/WhiteKitImage21.webp`,
        `${baseUrl}white/WhiteKitImage22.webp`,
        `${baseUrl}white/WhiteKitImage24.webp`,
        `${baseUrl}white/WhiteKitImage25.webp`,
        `${baseUrl}white/WhiteKitImage26.webp`,
        `${baseUrl}white/WhiteKitImage27.webp`
      ];
    
    case 'orange-pink':
      return [
        `${baseUrl}sunset/Sunset Kit Image 1.webp`,
        `${baseUrl}sunset/Sunset Kit Image 2.webp`,
        `${baseUrl}sunset/Sunset Kit Image 3.webp`,
        `${baseUrl}sunset/Sunset Kit Image 4.webp`,
        `${baseUrl}sunset/Sunset Kit Image 5.webp`,
        `${baseUrl}sunset/Sunset Kit Image 6.webp`,
        `${baseUrl}sunset/Sunset Kit Image 7.webp`,
        `${baseUrl}sunset/Sunset Kit Image 8.webp`,
        `${baseUrl}sunset/Sunset Kit Image 9.webp`,
        `${baseUrl}sunset/Sunset Kit Image 10.webp`,
        `${baseUrl}sunset/Sunset Kit Image 11.webp`,
        `${baseUrl}sunset/Sunset Kit Image 12.webp`,
        `${baseUrl}sunset/Sunset Kit Image 13.webp`,
        `${baseUrl}sunset/Sunset Kit Image 14.webp`,
        `${baseUrl}sunset/Sunset Kit Image 15.webp`,
        `${baseUrl}sunset/Sunset Kit Image 16.webp`,
        `${baseUrl}sunset/DSC01302.webp`,
        `${baseUrl}sunset/DSC01314.webp`,
        `${baseUrl}sunset/DSC01326.webp`
      ];
    
    case 'red-pink':
      return [
        `${baseUrl}red/Red Kit Image 1.webp`,
        `${baseUrl}red/Red Kit Image 2.webp`,
        `${baseUrl}red/Red Kit Image 3.webp`,
        `${baseUrl}red/Red Kit Image 4.webp`,
        `${baseUrl}red/Red Kit Image 5.webp`,
        `${baseUrl}red/Red Kit Image 6.webp`,
        `${baseUrl}red/Red Kit Image 8.webp`,
        `${baseUrl}red/Red Kit Image 9.webp`,
        `${baseUrl}red/Red Kit Image 10.webp`,
        `${baseUrl}red/Red Kit Image 11.webp`,
        `${baseUrl}red/Red Kit Image 14.webp`,
        `${baseUrl}red/Red Kit Image 15.webp`,
        `${baseUrl}red/Red Kit Image 16.webp`
      ];
    
    case 'poolparty':
      return [
        `${baseUrl}poolparty/Pool Party Kit Image 1.webp`,
        `${baseUrl}poolparty/Pool Party Kit Image 2.webp`,
        `${baseUrl}poolparty/Pool Party Kit Image 3.webp`,
        `${baseUrl}poolparty/Pool Party Kit Image 5.webp`,
        `${baseUrl}poolparty/Pool Party Kit Image 6.webp`,
        `${baseUrl}poolparty/Pool Party Kit Image 8.webp`,
        `${baseUrl}poolparty/Pool Party Kit Image 9.webp`,
        `${baseUrl}poolparty/Pool Party Kit Image 11.webp`,
        `${baseUrl}poolparty/Pool Party Kit Image 12.webp`,
        `${baseUrl}poolparty/Pool Party Kit Image 13.webp`,
        `${baseUrl}poolparty/Pool Party Kit Image 14.webp`,
        `${baseUrl}poolparty/Pool Party Kit Image 15.webp`,
        `${baseUrl}poolparty/Pool Party Kit Image 16.webp`,
        `${baseUrl}poolparty/DSC01884.webp`,
        `${baseUrl}poolparty/DSC01885.webp`
      ];
    
    default:
      return [];
  }
};

// Function to get kit name from kit ID
export const getKitName = (kitId) => {
  const kitNames = {
    'black': 'Black Kit',
    'floral': 'Floral Kit',
    'white': 'White Kit',
    'orange-pink': 'Orange & Pink Kit',
    'red-pink': 'Red & Pink Kit',
    'poolparty': 'Pool Party Kit'
  };
  
  return kitNames[kitId] || 'Kit';
};

