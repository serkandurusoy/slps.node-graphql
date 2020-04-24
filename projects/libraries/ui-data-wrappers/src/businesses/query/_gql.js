import { gql } from 'react-apollo';

export const business = gql`
  query business($businessId: String) {
    business(businessId: $businessId) {
      address {
        lat
        lng
        number
        street
        area
        city
        zip
        state
        country
      }
      categories
      description
      logo
      name
      openingHours {
        open
        day
        openingHour
        closingHour
      }
      phoneNumber
      pictures
    }
  }
`;

export const myBusiness = gql`
  query myBusiness {
    myBusiness {
      address {
        lat
        lng
        number
        street
        area
        city
        zip
        state
        country
      }
      categories
      description
      logo
      name
      openingHours {
        open
        day
        openingHour
        closingHour
      }
      phoneNumber
      pictures
    }
  }
`;
