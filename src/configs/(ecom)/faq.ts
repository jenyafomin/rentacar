interface FaqItem {
  question: string;
  answer: string;
}

interface FaqCategory {
  title: string;
  items: FaqItem[];
}

interface FaqData {
  categories: FaqCategory[];
}


export const faqData: FaqData = {
  categories: [
    {
      title: "Reservations & Booking",
      items: [
        {
          question: "How do I make a reservation?",
          answer: "You can make a reservation online through our website, by calling our reservation center, or by visiting one of our rental locations. Online reservations can be made 24/7 and offer the most convenience."
        },
        {
          question: "Can I modify or cancel my reservation?",
          answer: "Yes, you can modify or cancel your reservation by logging into your account on our website or by contacting our customer service. Please note that cancellation fees may apply depending on how close to the pickup time you cancel."
        },
        {
          question: "Is there a deposit required when booking?",
          answer: "Yes, a credit card is required to secure your reservation. A hold will be placed on your card for the estimated rental charges plus a security deposit, which is released upon return of the vehicle in its original condition."
        },
        {
          question: "What documents do I need to rent a car?",
          answer: "You will need a valid driver's license, a credit card in the renter's name, and proof of insurance. International renters may need an International Driving Permit along with their foreign license."
        }
      ]
    },
    {
      title: "Rental Policies",
      items: [
        {
          question: "What is your minimum age requirement for renting?",
          answer: "The minimum age to rent a car is 21 years old. Drivers under 25 may incur a young driver surcharge. Luxury and specialty vehicles may have higher age requirements."
        },
        {
          question: "What is your fuel policy?",
          answer: "Our vehicles are provided with a full tank of fuel. You are expected to return the car with the same amount of fuel. If not, a refueling charge will apply at our current rates."
        },
        {
          question: "Do you allow additional drivers?",
          answer: "Yes, additional drivers are allowed but must be present at the time of rental to present their driver's license and sign the rental agreement. An additional daily fee may apply."
        },
        {
          question: "What is your smoking policy?",
          answer: "All of our vehicles are non-smoking. A cleaning fee will be charged if evidence of smoking is found in the vehicle."
        }
      ]
    },
    {
      title: "Vehicles & Features",
      items: [
        {
          question: "What types of vehicles do you offer?",
          answer: "We offer a wide range of vehicles including economy cars, sedans, SUVs, minivans, luxury vehicles, and specialty cars. Browse our selection online to find the perfect vehicle for your needs."
        },
        {
          question: "Do your vehicles come with GPS navigation?",
          answer: "GPS navigation is available in most of our vehicles. It can be requested as an add-on during the reservation process for an additional daily fee."
        },
        {
          question: "Are child seats available?",
          answer: "Yes, child safety seats are available for rent. Please request them when making your reservation as they are subject to availability."
        },
        {
          question: "Do you offer one-way rentals?",
          answer: "Yes, one-way rentals are available between many of our locations. Additional fees may apply depending on the pickup and drop-off locations."
        }
      ]
    },
    {
      title: "Insurance & Coverage",
      items: [
        {
          question: "What insurance options do you offer?",
          answer: "We offer several insurance options including Loss Damage Waiver (LDW), Personal Accident Insurance (PAI), and Supplemental Liability Protection (SLP). Our agents can help you determine the best coverage for your needs."
        },
        {
          question: "Is roadside assistance included?",
          answer: "Basic roadside assistance is included with all rentals. Premium roadside assistance, which covers more situations, is available for an additional daily fee."
        },
        {
          question: "What happens if I get in an accident?",
          answer: "In case of an accident, ensure everyone's safety first, then contact local authorities and our emergency assistance number provided in your rental agreement. Document the incident and contact our office as soon as possible."
        },
        {
          question: "Does my personal auto insurance cover rental cars?",
          answer: "Most personal auto insurance policies extend coverage to rental cars, but it's best to check with your insurance provider before renting. Credit cards may also offer rental car coverage."
        }
      ]
    }
  ]
};

export function getFaqData(): FaqData {
  return faqData;
} 