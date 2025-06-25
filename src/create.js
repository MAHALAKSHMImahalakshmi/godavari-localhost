import React, { useState } from 'react';
import { Plane, MapPin, Users, Sun, Umbrella, Info, XCircle, Database, Globe } from 'lucide-react'; // Importing icons, added Globe
import firebaseApp from './firebase';
// Main App component
const App = () => {
    const [selectedDay, setSelectedDay] = useState(1); // State to manage the currently selected day
    const [isCrowdModalOpen, setIsCrowdModalOpen] = useState(false); // State to control crowd tips modal
    const [isDataBenefitModalOpen, setIsDataBenefitModalOpen] = useState(false); // State to control data benefit modal
    const [currentLanguage, setCurrentLanguage] = useState('en'); // State to manage current language

    // --- Translations Data ---
    // All textual content for the website, organized by language.
    // This allows for dynamic switching of all displayed text.

    const translations = {
        en: {
            header: {
                mainTitle: "Godavari Pushkaralu 2027: Family Pilgrimage",
                subTitle: "A Serene 5-Day Plan (July 23 - August 3)",
                budgetInfo: "Budget: ₹50,000 for 4 members",
                crowdTipsBtn: "View Crowd Avoidance Tips",
                howBuiltBtn: "How This Plan Was Built",
            },
            nav: {
                dayPrefix: "Day ",
            },
            aside: {
                planByDayTitle: "Plan by Day",
                budgetSummaryTitle: "Estimated Budget Breakdown",
                budgetNote: "*Note: Travel to/from Rajahmundry is the largest variable cost. Booking well in advance recommended.",
                aboutPlaceTitle: "About the Place",
            },
            main: {
                dayTitlePrefix: "Day ",
                significanceLabel: "Significance:",
                locationLabel: "Location:",
                notesLabel: "Notes:",
                tripRoadmapTitle: "Trip Roadmap",
                spiritualSignificanceTitle: "Godavari Pushkaram: Significance & Rituals",
                spiritualSignificanceContent: "The Godavari Pushkaram (every 12 years) is a highly sacred festival. It's believed that taking a holy dip in the Godavari when Jupiter (Brihaspati) is in the Leo zodiac sign purifies the soul of all sins. This period is highly auspicious for performing various karmas (rituals):",
                karmasList: [
                    "**Pushkar Snanam (Holy Dip):** The most important ritual, for spiritual purification.",
                    "**Pitru Tharpanam/Shraddham:** Offering prayers and rituals for ancestors to seek their blessings and peace for their souls.",
                    "**Daana (Charity):** Donating food, clothes, money, or other items to the needy is considered highly meritorious.",
                    "**Tirtha Yatra:** Visiting sacred temples and pilgrimage sites along the river.",
                    "**Japa & Dhyana:** Chanting mantras and meditation for spiritual upliftment."
                ],
                govtServicesTitle: "Government-Specific Services & Things to Look For:",
                govtServicesContent: "The Andhra Pradesh government is making extensive arrangements to ensure a smooth and safe pilgrimage. Look out for:",
                govtServicesList: [
                    "**APSRTC:** The primary mode of public transport for inter-city and intra-city travel. They will run special services during Pushkaralu. Check their official website for schedules and routes.",
                    "**APTDC (Andhra Pradesh Tourism Development Corporation):** Look for 'Haritha Hotels' or 'APTDC Guest Houses' for reliable, budget-friendly accommodation. Inquire about APTDC-operated boating services. Some properties have their own restaurants, offering hygienic local cuisine.",
                    "**Government Canteens/Food Stalls:** During major festivals, the government often sets up subsidized or managed food distribution centers/canteens. Look for official signage.",
                    "**Police & Medical Aid:** Extensive security and medical facilities will be provided. Look for designated aid posts.",
                    "**Information Centers:** Official government information kiosks will be set up at key locations to guide pilgrims."
                ],
            },
            footer: {
                copyright: "Godavari Pushkaralu Trip Planner. All rights reserved.",
            },
            modals: {
                crowdTipsTitle: "Crowd Management & Tips",
                crowdTipsGotIt: "Got It!",
                dataBenefitTitle: "How This Plan Was Built",
                dataBenefitContent1: "This interactive plan was primarily built by leveraging detailed information from the **'Akhanda Godavari Tourism Project Report.pdf'** you provided.",
                dataBenefitList: [
                    "The PDF's insights into future developments like the **Havelock Bridge attractions (Glass Bridge, tunnels, etc.)**, **Tent City**, and specific ghat renovations allowed us to create a unique, forward-looking itinerary.",
                    "Information on places like **Kadiyam Nursery** and **Sri Kota Sattemma Temple in Nidadavole** helped diversify the trip beyond main Rajahmundry sites.",
                    "The project's scale and government involvement mentioned in the PDF guided the recommendation for **government-backed services (APSRTC, APTDC)** for reliability and budget efficiency."
                ],
                dataBenefitContent2: "While an Excel sheet was referenced, direct data capture from external spreadsheet links is not possible for this system. The itinerary data was structured and integrated from the rich textual details provided, making it interactive and easy to explore.",
                dataBenefitClose: "Close",
            },
            // Itinerary details
            itinerary: [
                {
                    day: 1,
                    title: "Arrival & Evening Aarti – A Serene Start",
                    details: [
                        { time: "08:00 AM - 12:00 PM", activity: "Travel & Arrival in Rajahmundry, Transfer & Check-in", significance: "Fresh beginning to the pilgrimage.", location: "Rajahmundry", notes: "Transport: APSRTC Special Pushkaralu Buses/Govt. Hired Cabs. Accommodation: Prioritize APTDC Haritha Resorts/Govt. Guest Houses (Book ASAP!). Food: APTDC Restaurant/Govt. Canteen." },
                        { time: "12:00 PM - 02:00 PM", activity: "Check-in & Lunch", significance: "Settle in and prepare for the spiritual journey.", location: "Accommodation Area", notes: "Enjoy traditional Andhra vegetarian thali." },
                        { time: "02:00 PM - 05:00 PM", activity: "Rest & Preparation for Evening Ritual", significance: "Time for family bonding and spiritual readiness.", location: "Accommodation Area", notes: "Recharge before the major evening event." },
                        { time: "05:00 PM - 08:00 PM", activity: "Witness Grand Godavari Harathi at Renovated Pushkar Ghats", significance: "Witnessing the divine fire offering to River Godavari, for peace & prosperity.", location: "Pushkar Ghats", notes: "Experience: Enhanced spiritual and ghat-front infrastructure. Crowd Strategy: Arrive early for a good viewing spot. Safety: Rely on official crowd management & security." },
                        { time: "08:00 PM - 09:30 PM", activity: "Dinner & Rest", significance: "End the day with nourishment and rest.", location: "Local/Accommodation", notes: "Enjoy local Andhra vegetarian cuisine at a reliable restaurant or your APTDC resort." }
                    ]
                },
                {
                    day: 2,
                    title: "Auspicious Holy Dip & Rajahmundry Temples",
                    details: [
                        { time: "04:00 AM - 06:30 AM", activity: "**Holy Dip (Pushkar Snanam)** at Less Crowded Ghat", significance: "Cleansing of sins, spiritual purification (Karma: Snanam & Pitru Tharpanam).", location: "Saraswati/Gowthami Ghats (or well-managed Pushkar Ghat)", notes: "Crowd Strategy: Begin before 6:00 AM for serenity. Focus: Prioritize quiet reflection & family bonding. Karmas: Perform simple water offerings to ancestors (Pitru Tharpanam) and chant prayers." },
                        { time: "07:00 AM - 08:00 AM", activity: "Breakfast", significance: "Replenish energy after the holy dip.", location: "Local/Accommodation", notes: "Have a quick, hygienic breakfast (Idli, Dosa, Pesarattu) at a nearby government-approved canteen or small local eatery." },
                        { time: "08:30 AM - 12:30 PM", activity: "Temple Trail: Kotilingeswara Swamy, Markandeya Swamy, ISKCON Temple", significance: "Seeking blessings from ancient deities, spiritual upliftment (Karma: Tirtha Yatra & Darshan).", location: "Rajahmundry", notes: "Transport: APSRTC City Buses/Autos. Significance: Kotilingeswara (ancient Shiva), Markandeya (legendary Rishi), ISKCON (Hare Krishna movement, serene)." },
                        { time: "12:30 PM - 02:00 PM", activity: "Lunch & Rest", significance: "Rest and recharge for the afternoon.", location: "Local/Accommodation", notes: "Enjoy a wholesome Andhra lunch. Return to accommodation for rest." },
                        { time: "04:00 PM - 07:00 PM", activity: "Local Exploration & Relaxation", significance: "Experience local culture and peaceful river views.", location: "Rajahmundry Main Road", notes: "Explore for authentic Andhra handicrafts and local snacks." },
                        { time: "07:30 PM onwards", activity: "Dinner & Family Time", significance: "Bonding and relaxation.", location: "Local/Accommodation", notes: "Enjoy a delightful dinner with your family." }
                    ]
                },
                {
                    day: 3,
                    title: "Havelock Bridge Transformation & Eco-Tourism",
                    details: [
                        { time: "08:00 AM - 09:00 AM", activity: "Breakfast", significance: "Prepare for a day of exploration.", location: "Local/Accommodation", notes: "" },
                        { time: "09:00 AM - 01:00 PM", activity: "**Havelock Bridge Redevelopment Experience**", significance: "Blend of history, technology, and recreation.", location: "Havelock Bridge", notes: "Highlight: Explore Glass Bridge, Waterfall Zone, Rail Museum, Aquarium Tunnel (as per Akhanda Godavari Project). Comfort: Designed as a major tourist attraction with modern amenities. Budget Note: Allocate entry fees for various zones." },
                        { time: "01:00 PM - 02:00 PM", activity: "Lunch", significance: "Recharge after morning activities.", location: "Near Bridge Lanka/Havelock Bridge area", notes: "Look for government-approved food stalls or an APTDC facility." },
                        { time: "02:30 PM - 06:00 PM", activity: "Bridge Lanka & Tent City Eco-Tourism (Boating, Relaxation)", significance: "Connecting with nature, peaceful river activities.", location: "Bridge Lanka/Tent City Area", notes: "Activity: Inquire about APTDC-operated boating services for a family-friendly river experience. Environment: Enjoy the planned eco-tourism attractions." },
                        { time: "06:30 PM - 07:30 PM", activity: "Return to Rajahmundry", significance: "Travel back to base.", location: "Rajahmundry", notes: "" },
                        { time: "07:30 PM onwards", activity: "Dinner & Leisure", significance: "Relax and unwind.", location: "Local/Accommodation", notes: "" }
                    ]
                },
                {
                    day: 4,
                    title: "Nidadavole & Kadiyam Nursery – Culture and Nature",
                    details: [
                        { time: "07:00 AM - 08:00 AM", activity: "Breakfast", significance: "Prepare for the day trip.", location: "Local/Accommodation", notes: "" },
                        { time: "08:00 AM - 12:00 PM", activity: "Day Trip to Nidadavole: Sri Kota Sattemma Temple", significance: "Experiencing regional devotion, quieter spiritual atmosphere.", location: "Nidadavole", notes: "Transport: APSRTC Inter-city Bus (approx. 45-60 mins, cost-effective). Significance: Visit the beautified and modernized temple, away from peak crowds." },
                        { time: "12:00 PM - 01:00 PM", activity: "Travel to Kadiyam & Lunch", significance: "Transition to the next destination.", location: "Kadiyam", notes: "Take a local auto or shared government-approved transport from Nidadavole towards Kadiyam. Lunch at a local, hygienic eatery in Kadiyam." },
                        { time: "01:00 PM - 04:00 PM", activity: "Kadiyam Nursery Experience Centre (Revamped)", significance: "Nature appreciation, relaxation, unique local experience.", location: "Kadiyam", notes: "Activity: Explore vast ornamental plant nurseries, a pleasant and calming experience for the family. Ideal for photography." },
                        { time: "04:30 PM - 05:30 PM", activity: "Return to Rajahmundry", significance: "Travel back to base.", location: "Rajahmundry", notes: "APSRTC Bus/shared auto." },
                        { time: "05:30 PM - 07:00 PM", activity: "Samisragudem Harathi Ghat", significance: "Intimate spiritual development in the canal region.", location: "Samisragudem", notes: "A more serene alternative for prayer and reflection." },
                        { time: "07:30 PM onwards", activity: "Farewell Dinner & Reflection", significance: "Cherishing family time and memories of the pilgrimage.", location: "Rajahmundry", notes: "Enjoy a final Andhra feast." }
                    ]
                }
            ],
            // Budget data
            budget: [
                { item: "Accommodation (5 nights x ₹1500/night)", cost: "₹7,500" },
                { item: "Food (₹400/person/day x 4 people x 5 days)", cost: "₹8,000" },
                { item: "Local Transport (APSRTC Special Buses/Govt Hired Cabs)", cost: "₹7,500" },
                { item: "Entry Fees/Activities/Donations", cost: "₹4,000" },
                { item: "Miscellaneous/Contingency", cost: "₹3,000" },
                { item: "Travel to/from Rajahmundry (Train/Bus from Bengaluru)", cost: "₹20,000" },
                { item: "**Total Estimated Budget**", cost: "**₹50,000**" }
            ],
            // Place info data
            placeInfo: {
                rajahmundry: {
                    title: "Rajahmundry: The Cultural Capital of Andhra Pradesh",
                    description: "Rajahmundry, also known as Rajamahendravaram, is a historic city on the banks of the Godavari River. It is renowned for its rich cultural heritage, ancient temples, and as a significant pilgrimage center, especially during the Pushkaralu festival. It is often referred to as the 'Cultural Capital of Andhra Pradesh' due to its contributions to Telugu literature, art, and cinema. The city is preparing extensively for the 2027 Pushkaralu, aiming to enhance pilgrim facilities and tourist attractions.",
                },
                godavariRiver: {
                    title: "Godavari River: The 'Ganga of the South'",
                    description: "The Godavari River is the second-longest river in India and is considered one of the seven sacred rivers of Hinduism. Originating in Nashik, Maharashtra, it flows eastward through Andhra Pradesh and Telangana before emptying into the Bay of Bengal. The river is revered as 'Dakshina Ganga' (Ganga of the South) and is central to numerous mythological tales and spiritual practices. Bathing in its waters during Pushkaralu is believed to purify one's soul and grant spiritual liberation.",
                }
            },
            // Crowd tips data
            crowdTips: [
                { time: "Holy Dip (Pushkar Snanam)", advice: "Best times are **early morning (before 6:00 AM)** or **late evening (after 8:00 PM)**. Avoid midday peak hours for a more peaceful experience. Consider less crowded ghats like Saraswati Ghat or Gowthami Ghat if the main Pushkar Ghats are heavily congested. The government aims for segmented crowd routes and efficient ghat utilization." },
                { time: "Havelock Bridge Attractions", advice: "Visit right after opening **(around 9:00 AM)** or in the **late afternoon (after 4:00 PM)**. Midday will likely be very crowded. Utilize government guidance on designated entry/exit points." },
                { time: "Popular Temples (Kotilingeswara Swamy, Markandeya)", advice: "Aim for **early morning darshan (before 8:00 AM)** or during **afternoon lull periods** (check specific temple timings). Be prepared for queues, but early hours usually offer a calmer visit." },
                { time: "Local Transport (Buses/Autos)", advice: "Travel during **off-peak hours** if possible (mid-morning or mid-afternoon). APSRTC special buses are organized to manage pilgrim flow; follow their designated routes and schedules. Expect some delays due to increased traffic." },
                { time: "General Crowds", advice: "The government is planning for huge crowds (8 crore+ pilgrims). Utilize official information centers, 'Stay Home' buffer zones, and AI-based crowd monitoring for real-time updates. Stay hydrated and be patient." }
            ],
            // Roadmap data
            roadmap: [
                { name: "Arrival in Rajahmundry", icon: <Plane className="text-blue-500" /> },
                { name: "Pushkar Ghats & Godavari Harathi", icon: <Umbrella className="text-green-500" /> },
                { name: "Holy Dip & Rajahmundry Temples", icon: <Sun className="text-yellow-500" /> },
                { name: "Havelock Bridge & Eco-Tourism", icon: <Info className="text-purple-500" /> },
                { name: "Nidadavole & Kadiyam Nursery", icon: <MapPin className="text-red-500" /> },
                { name: "Samisragudem Harathi Ghat", icon: <Users className="text-orange-500" /> },
                { name: "Departure from Rajahmundry", icon: <Plane className="text-blue-500" /> }
            ],
            // Day 5 details (last day)
            day5details: [
                { time: "07:00 AM - 08:00 AM", activity: "Optional Final Dip / Leisurely Breakfast / Souvenir Shopping", significance: "Peaceful conclusion to the pilgrimage.", location: "Rajahmundry", notes: "Opportunity for a last moment by the holy river or to pick up any forgotten souvenirs." },
                { time: "08:00 AM - 09:00 AM", activity: "Breakfast", significance: "Last meal in Rajahmundry.", location: "Local/Accommodation", notes: "Enjoy a relaxed breakfast at your resort/a favorite eatery." },
                { time: "09:00 AM - 10:00 AM", activity: "Check-out", significance: "Formal departure from accommodation.", location: "Accommodation", notes: "Complete check-out formalities." },
                { time: "10:00 AM onwards", activity: "Departure from Rajahmundry", significance: "Concluding the spiritual journey.", location: "Rajahmundry", notes: "Transport: APSRTC Buses/Pre-booked cabs to the railway station or bus complex for your onward journey back to Bengaluru." }
            ]
        },
        hi: { // Hindi Translations
            header: {
                mainTitle: "गोदावरी पुष्करालु 2027: पारिवारिक तीर्थयात्रा",
                subTitle: "एक शांत 5-दिवसीय योजना (23 जुलाई - 3 अगस्त)",
                budgetInfo: "बजट: 4 सदस्यों के लिए ₹50,000",
                crowdTipsBtn: "भीड़ से बचने के टिप्स देखें",
                howBuiltBtn: "यह योजना कैसे बनाई गई",
            },
            nav: {
                dayPrefix: "दिन ",
            },
            aside: {
                planByDayTitle: "दिन के अनुसार योजना",
                budgetSummaryTitle: "अनुमानित बजट विवरण",
                budgetNote: "*नोट: राजमुंदरी आने-जाने का किराया सबसे बड़ा परिवर्तनीय खर्च है। अग्रिम बुकिंग की सलाह दी जाती है।",
                aboutPlaceTitle: "स्थान के बारे में",
            },
            main: {
                dayTitlePrefix: "दिन ",
                significanceLabel: "महत्व:",
                locationLabel: "स्थान:",
                notesLabel: "नोट्स:",
                tripRoadmapTitle: "यात्रा रोडमैप",
                spiritualSignificanceTitle: "गोदावरी पुष्करम: महत्व और अनुष्ठान",
                spiritualSignificanceContent: "गोदावरी पुष्करम (हर 12 साल में) एक अत्यंत पवित्र त्योहार है। ऐसा माना जाता है कि जब बृहस्पति (बृहस्पति) सिंह राशि में प्रवेश करते हैं तो गोदावरी में पवित्र स्नान करने से सभी पाप धुल जाते हैं। यह अवधि विभिन्न कर्मों (अनुष्ठानों) को करने के लिए अत्यधिक शुभ है:",
                karmasList: [
                    "**पुष्कर स्नान (पवित्र डुबकी):** आध्यात्मिक शुद्धि के लिए सबसे महत्वपूर्ण अनुष्ठान।",
                    "**पितृ तर्पणम/श्राद्धम:** दिवंगत आत्माओं की शांति और आशीर्वाद के लिए पूर्वजों को प्रार्थना और अनुष्ठान अर्पित करना।",
                    "**दान (दान):** जरूरतमंदों को भोजन, वस्त्र या अन्य वस्तुएं दान करना अत्यधिक पुण्यकारी माना जाता है।",
                    "**तीर्थ यात्रा:** नदी के किनारे स्थित पवित्र मंदिरों और तीर्थ स्थलों का भ्रमण करना।",
                    "**जप और ध्यान:** आध्यात्मिक उत्थान के लिए मंत्रों का जप और ध्यान करना।"
                ],
                govtServicesTitle: "सरकारी विशिष्ट सेवाएँ और देखने योग्य बातें:",
                govtServicesContent: "आंध्र प्रदेश सरकार सुचारू और सुरक्षित तीर्थयात्रा सुनिश्चित करने के लिए व्यापक व्यवस्था कर रही है। इन पर ध्यान दें:",
                govtServicesList: [
                    "**एपीएसआरटीसी (APSRTC):** अंतर-शहर और शहर के भीतर यात्रा के लिए सार्वजनिक परिवहन का प्राथमिक साधन। वे पुष्करालु के दौरान विशेष सेवाएँ चलाएंगे। शेड्यूल और मार्गों के लिए उनकी आधिकारिक वेबसाइट देखें।",
                    "**एटीपीटीसी (APTDC - आंध्र प्रदेश पर्यटन विकास निगम):** विश्वसनीय, बजट-अनुकूल आवास के लिए 'हरिता होटल' या 'एटीपीटीसी गेस्ट हाउस' देखें। एटीपीटीसी-संचालित नौका सेवाओं के बारे में पूछताछ करें। कुछ संपत्तियों में उनके अपने रेस्तरां हैं, जो स्वच्छ स्थानीय व्यंजन परोसते हैं।",
                    "**सरकारी कैंटीन/भोजन स्टॉल:** प्रमुख त्योहारों के दौरान, सरकार अक्सर सब्सिडी वाले या प्रबंधित खाद्य वितरण केंद्र/कैंटीन स्थापित करती है। आधिकारिक साइनेज देखें।",
                    "**पुलिस और चिकित्सा सहायता:** त्योहार के दौरान व्यापक सुरक्षा और चिकित्सा सुविधाएँ प्रदान की जाएंगी। नामित सहायता चौकियों पर ध्यान दें।",
                    "**सूचना केंद्र:** तीर्थयात्रियों को मार्गदर्शन के लिए प्रमुख स्थानों पर आधिकारिक सरकारी सूचना कियोस्क स्थापित किए जाएंगे।"
                ],
            },
            footer: {
                copyright: "गोदावरी पुष्करालु यात्रा योजनाकार। सर्वाधिकार सुरक्षित।",
            },
            modals: {
                crowdTipsTitle: "भीड़ प्रबंधन और टिप्स",
                crowdTipsGotIt: "समझ गया!",
                dataBenefitTitle: "यह योजना कैसे बनाई गई",
                dataBenefitContent1: "यह इंटरैक्टिव योजना मुख्य रूप से आपके द्वारा प्रदान की गई **'अखंड गोदावरी पर्यटन परियोजना रिपोर्ट.पीडीएफ'** से विस्तृत जानकारी का लाभ उठाकर बनाई गई थी।",
                dataBenefitList: [
                    "पीडीएफ की अंतर्दृष्टि ने भविष्य के विकास जैसे **हैवलॉक ब्रिज आकर्षण (ग्लास ब्रिज, सुरंगें, आदि)**, **टेंट सिटी**, और विशिष्ट घाटों के नवीनीकरण से हमें एक अद्वितीय, दूरंदेशी यात्रा कार्यक्रम बनाने में मदद मिली।",
                    "**कादियम नर्सरी** और **निडाडावोल में श्री कोटा सट्टेम्मा मंदिर** जैसे स्थानों की जानकारी ने मुख्य राजमुंदरी स्थलों से परे यात्रा को विविधता प्रदान करने में मदद की।",
                    "पीडीएफ में उल्लिखित परियोजना का पैमाना और सरकारी भागीदारी ने विश्वसनीयता और बजट दक्षता के लिए **सरकारी समर्थित सेवाओं (एपीएसआरटीसी, एटीपीटीसी)** की सिफारिश को निर्देशित किया।"
                ],
                dataBenefitContent2: "जबकि एक एक्सेल शीट का उल्लेख किया गया था, इस प्रणाली के लिए बाहरी स्प्रैडशीट लिंक से सीधे डेटा कैप्चर करना संभव नहीं है। यात्रा कार्यक्रम डेटा प्रदान किए गए समृद्ध पाठ्य विवरणों से संरचित और एकीकृत किया गया था, जिससे यह इंटरैक्टिव और खोजने में आसान हो गया।",
                dataBenefitClose: "बंद करें",
            },
            itinerary: [
                {
                    day: 1,
                    title: "आगमन और संध्या आरती – एक शांत शुरुआत",
                    details: [
                        { time: "सुबह 08:00 बजे - दोपहर 12:00 बजे", activity: "राजमुंदरी में आगमन और चेक-इन", significance: "तीर्थयात्रा की ताज़ा शुरुआत।", location: "राजमुंदरी", notes: "परिवहन: एपीएसआरटीसी विशेष पुष्करालु बसें/सरकारी किराए की कैब। आवास: एटीपीटीसी हरिता रिसॉर्ट्स/सरकारी गेस्ट हाउस को प्राथमिकता दें (जितनी जल्दी हो सके बुक करें!)। भोजन: एटीपीटीसी रेस्तरां/सरकारी कैंटीन।" },
                        { time: "दोपहर 12:00 बजे - दोपहर 02:00 बजे", activity: "चेक-इन और दोपहर का भोजन", significance: "आध्यात्मिक यात्रा के लिए व्यवस्थित हों और तैयारी करें।", location: "आवास क्षेत्र", notes: "पारंपरिक आंध्र शाकाहारी थाली का आनंद लें।" },
                        { time: "दोपहर 02:00 बजे - शाम 05:00 बजे", activity: "आराम और शाम के अनुष्ठान की तैयारी", significance: "पारिवारिक बंधन और आध्यात्मिक तैयारी का समय।", location: "आवास क्षेत्र", notes: "प्रमुख शाम की घटना से पहले रिचार्ज करें।" },
                        { time: "शाम 05:00 बजे - रात 08:00 बजे", activity: "नवीनीकृत पुष्कर घाटों पर भव्य गोदावरी आरती देखें", significance: "गोदावरी नदी को शांति और समृद्धि के लिए दिव्य अग्नि अर्पित करना।", location: "पुष्कर घाट", notes: "अनुभव: उन्नत आध्यात्मिक और घाट-सामने का बुनियादी ढाँचा। भीड़ रणनीति: अच्छी देखने की जगह के लिए जल्दी पहुंचें। सुरक्षा: आधिकारिक भीड़ प्रबंधन और सुरक्षा पर भरोसा करें।" },
                        { time: "रात 08:00 बजे - रात 09:30 बजे", activity: "रात का खाना और आराम", significance: "पोषण और आराम के साथ दिन का अंत करें।", location: "स्थानीय/आवास", notes: "एक विश्वसनीय रेस्तरां या अपने एटीपीटीसी रिसॉर्ट में स्थानीय आंध्र शाकाहारी व्यंजन का आनंद लें।" }
                    ]
                },
                {
                    day: 2,
                    title: "शुभ पवित्र डुबकी और राजमुंदरी मंदिर",
                    details: [
                        { time: "सुबह 04:00 बजे - सुबह 06:30 बजे", activity: "**पवित्र डुबकी (पुष्कर स्नान)** कम भीड़ वाले घाट पर", significance: "पापों का शुद्धिकरण, आध्यात्मिक शुद्धि (कर्म: स्नान और पितृ तर्पणम)।", location: "सरस्वती/गौतमी घाट (या अच्छी तरह से प्रबंधित पुष्कर घाट)", notes: "भीड़ रणनीति: शांति के लिए सुबह 6:00 बजे से पहले शुरू करें। ध्यान: शांत प्रतिबिंब और पारिवारिक बंधन को प्राथमिकता दें। कर्म: पूर्वजों को साधारण जल अर्पित करें (पितृ तर्पणम) और प्रार्थना करें।" },
                        { time: "सुबह 07:00 बजे - सुबह 08:00 बजे", activity: "नाश्ता", significance: "पवित्र डुबकी के बाद ऊर्जा भरें।", location: "स्थानीय/आवास", notes: "पास के सरकारी-अनुमोदित कैंटीन या छोटे स्थानीय भोजनालय में त्वरित, स्वच्छ नाश्ता (इडली, डोसा, पेसरट्टू) करें।" },
                        { time: "सुबह 08:30 बजे - दोपहर 12:30 बजे", activity: "मंदिर यात्रा: कोटिलिंगेश्वर स्वामी, मार्कंडेय स्वामी, इस्कॉन मंदिर", significance: "प्राचीन देवताओं से आशीर्वाद प्राप्त करना, आध्यात्मिक उत्थान (कर्म: तीर्थ यात्रा और दर्शन)।", location: "राजमुंदरी", notes: "परिवहन: एपीएसआरटीसी सिटी बसें/ऑटो। महत्व: कोटिलिंगेश्वर (प्राचीन शिव), मार्कंडेय (पौराणिक ऋषि), इस्कॉन (हरे कृष्ण आंदोलन, शांत)।" },
                        { time: "दोपहर 12:30 बजे - दोपहर 02:00 बजे", activity: "दोपहर का भोजन और आराम", significance: "दोपहर के लिए आराम करें और रिचार्ज करें।", location: "स्थानीय/आवास", notes: "एक पौष्टिक आंध्र दोपहर का भोजन करें। आराम के लिए आवास पर लौटें।" },
                        { time: "शाम 04:00 बजे - शाम 07:00 बजे", activity: "स्थानीय अन्वेषण और विश्राम", significance: "स्थानीय संस्कृति और शांत नदी दृश्यों का अनुभव करें।", location: "राजमुंदरी मुख्य सड़क", notes: "प्रामाणिक आंध्र हस्तशिल्प और स्थानीय स्नैक्स के लिए अन्वेषण करें।" },
                        { time: "शाम 07:30 बजे से", activity: "रात का खाना और पारिवारिक समय", significance: "बंधन और विश्राम।", location: "स्थानीय/आवास", notes: "अपने परिवार के साथ एक स्वादिष्ट रात का खाना का आनंद लें।" }
                    ]
                },
                {
                    day: 3,
                    title: "हैवलॉक ब्रिज परिवर्तन और पर्यावरण-पर्यटन",
                    details: [
                        { time: "सुबह 08:00 बजे - सुबह 09:00 बजे", activity: "नाश्ता", significance: "अन्वेषण के दिन के लिए तैयारी करें।", location: "स्थानीय/आवास", notes: "" },
                        { time: "सुबह 09:00 बजे - दोपहर 01:00 बजे", activity: "**हैवलॉक ब्रिज पुनर्विकास अनुभव**", significance: "इतिहास, प्रौद्योगिकी और मनोरंजन का मिश्रण।", location: "हैवलॉक ब्रिज", notes: "मुख्य आकर्षण: ग्लास ब्रिज, झरना क्षेत्र, रेल संग्रहालय, एक्वेरियम टनल (अखंड गोदावरी परियोजना के अनुसार) का अन्वेषण करें। आराम: आधुनिक सुविधाओं के साथ एक प्रमुख पर्यटक आकर्षण के रूप में डिज़ाइन किया गया। बजट नोट: विभिन्न क्षेत्रों के लिए प्रवेश शुल्क आवंटित करें।" },
                        { time: "दोपहर 01:00 बजे - दोपहर 02:00 बजे", activity: "दोपहर का भोजन", significance: "सुबह की गतिविधियों के बाद रिचार्ज करें।", location: "ब्रिज लंका/हैवलॉक ब्रिज क्षेत्र के पास", notes: "सरकारी-अनुमोदित भोजन स्टालों या एटीपीटीसी सुविधा की तलाश करें।" },
                        { time: "दोपहर 02:30 बजे - शाम 06:00 बजे", activity: "ब्रिज लंका और टेंट सिटी इको-टूरिज्म (नौकायन, विश्राम)", significance: "प्रकृति के साथ जुड़ना, शांत नदी गतिविधियां।", location: "ब्रिज लंका/टेंट सिटी क्षेत्र", notes: "गतिविधि: परिवार के अनुकूल नदी अनुभव के लिए एटीपीटीसी-संचालित नौका सेवाओं के बारे में पूछताछ करें। पर्यावरण: नियोजित पर्यावरण-पर्यटन आकर्षणों का आनंद लें।" },
                        { time: "शाम 06:30 बजे - शाम 07:30 बजे", activity: "राजमुंदरी लौटें", significance: "बेस पर वापस यात्रा करें।", location: "राजमुंदरी", notes: "" },
                        { time: "शाम 07:30 बजे से", activity: "रात का खाना और फुर्सत", significance: "आराम करें और तनावमुक्त हों।", location: "स्थानीय/आवास", notes: "" }
                    ]
                },
                {
                    day: 4,
                    title: "निडाडावोल और कादियम नर्सरी – संस्कृति और प्रकृति",
                    details: [
                        { time: "सुबह 07:00 बजे - सुबह 08:00 बजे", activity: "नाश्ता", significance: "दिन की यात्रा के लिए तैयारी करें।", location: "स्थानीय/आवास", notes: "" },
                        { time: "सुबह 08:00 बजे - दोपहर 12:00 बजे", activity: "निडाडावोल की दिन की यात्रा: श्री कोटा सट्टेम्मा मंदिर", significance: "क्षेत्रीय भक्ति, शांत आध्यात्मिक वातावरण का अनुभव करना।", location: "निडाडावोल", notes: "परिवहन: एपीएसआरटीसी अंतर-शहर बस (लगभग 45-60 मिनट, लागत प्रभावी)। महत्व: भीड़-भाड़ से दूर, सुंदर और आधुनिक मंदिर का भ्रमण करें।" },
                        { time: "दोपहर 12:00 बजे - दोपहर 01:00 बजे", activity: "कादियम की यात्रा और दोपहर का भोजन", significance: "अगले गंतव्य पर संक्रमण।", location: "कादियम", notes: "निडाडावोल से कादियम की ओर स्थानीय ऑटो या साझा सरकारी-अनुमोदित परिवहन लें। कादियम में एक स्थानीय, स्वच्छ भोजनालय में दोपहर का भोजन करें।" },
                        { time: "दोपहर 01:00 बजे - शाम 04:00 बजे", activity: "कादियम नर्सरी अनुभव केंद्र (पुनर्जीवित)", significance: "प्रकृति की प्रशंसा, विश्राम, अद्वितीय स्थानीय अनुभव।", location: "कादियम", notes: "गतिविधि: विशाल सजावटी पौधों की नर्सरियों का अन्वेषण करें, परिवार के लिए एक सुखद और शांत अनुभव। फोटोग्राफी के लिए आदर्श।" },
                        { time: "शाम 04:30 बजे - शाम 05:30 बजे", activity: "राजमुंदरी लौटें", significance: "बेस पर वापस यात्रा करें।", location: "राजमुंदरी", notes: "एपीएसआरटीसी बस/साझा ऑटो।" },
                        { time: "शाम 05:30 बजे - शाम 07:00 बजे", activity: "समिस्रागुडेम आरती घाट", significance: "नहर क्षेत्र में अंतरंग आध्यात्मिक विकास।", location: "समिस्रागुडेम", notes: "प्रार्थना और प्रतिबिंब के लिए एक अधिक शांत विकल्प।" },
                        { time: "शाम 07:30 बजे से", activity: "विदाई रात का खाना और प्रतिबिंब", significance: "तीर्थयात्रा की पारिवारिक समय और यादों को संजोना।", location: "राजमुंदरी", notes: "एक अंतिम आंध्र दावत का आनंद लें।" }
                    ]
                }
            ],
            // Budget data (re-referenced to English as costs are universal)
            budget: [
                { item: "आवास (5 रातें x ₹1500/रात)", cost: "₹7,500" },
                { item: "भोजन (₹400/व्यक्ति/दिन x 4 लोग x 5 दिन)", cost: "₹8,000" },
                { item: "स्थानीय परिवहन (APSRTC विशेष बसें/सरकारी किराए की कैब)", cost: "₹7,500" },
                { item: "प्रवेश शुल्क/गतिविधियां/दान", cost: "₹4,000" },
                { item: "विविध/आपातकालीन", cost: "₹3,000" },
                { item: "राजमुंदरी आने-जाने का किराया (बेंगलुरु से ट्रेन/बस)", cost: "₹20,000" },
                { item: "**कुल अनुमानित बजट**", cost: "**₹50,000**" }
            ],
            // Place info data
            placeInfo: {
                rajahmundry: {
                    title: "राजमुंदरी: आंध्र प्रदेश की सांस्कृतिक राजधानी",
                    description: "राजमुंदरी, जिसे राजामहेंद्रवरम के नाम से भी जाना जाता है, गोदावरी नदी के तट पर स्थित एक ऐतिहासिक शहर है। यह अपनी समृद्ध सांस्कृतिक विरासत, प्राचीन मंदिरों और एक महत्वपूर्ण तीर्थस्थल के रूप में प्रसिद्ध है, खासकर पुष्करालु उत्सव के दौरान। इसे अक्सर तेलुगु साहित्य, कला और सिनेमा में इसके योगदान के कारण 'आंध्र प्रदेश की सांस्कृतिक राजधानी' के रूप में जाना जाता है। शहर 2027 पुष्करालु के लिए व्यापक तैयारी कर रहा है, जिसका उद्देश्य तीर्थयात्री सुविधाओं और पर्यटक आकर्षणों को बढ़ाना है।",
                },
                godavariRiver: {
                    title: "गोदावरी नदी: 'दक्षिण की गंगा'",
                    description: "गोदावरी नदी भारत की दूसरी सबसे लंबी नदी है और इसे हिंदू धर्म की सात पवित्र नदियों में से एक माना जाता है। नासिक, महाराष्ट्र में उद्गम होकर, यह पूर्व की ओर आंध्र प्रदेश और तेलंगाना से होकर बहती है और बंगाल की खाड़ी में गिरती है। नदी को 'दक्षिणा गंगा' के रूप में पूजा जाता है और यह कई पौराणिक कथाओं और आध्यात्मिक प्रथाओं का केंद्र है। पुष्करालु के दौरान इसके पानी में स्नान करने से आत्मा शुद्ध होती है और आध्यात्मिक मुक्ति मिलती है।",
                }
            },
            // Crowd tips data
            crowdTips: [
                { time: "पवित्र डुबकी (पुष्कर स्नान)", advice: "सबसे अच्छा समय **सुबह जल्दी (सुबह 6:00 बजे से पहले)** या **देर शाम (रात 8:00 बजे के बाद)** है। अधिक शांतिपूर्ण अनुभव के लिए दोपहर के व्यस्त समय से बचें। यदि मुख्य पुष्कर घाटों पर अधिक भीड़ हो तो सरस्वती घाट या गौतमी घाट जैसे कम भीड़ वाले घाटों पर विचार करें। सरकार का लक्ष्य खंडित भीड़ मार्गों और कुशल घाट उपयोगिता के लिए है।" },
                { time: "हैवलॉक ब्रिज आकर्षण", advice: "खुलने के ठीक बाद **(लगभग सुबह 9:00 बजे)** या **देर शाम (शाम 4:00 बजे के बाद)** जाएँ। दोपहर में बहुत भीड़ होने की संभावना है। नामित प्रवेश/निकास बिंदुओं पर सरकारी मार्गदर्शन का उपयोग करें।" },
                { time: "लोकप्रिय मंदिर (कोटिलिंगेश्वर स्वामी, मार्कंडेय)", advice: "**सुबह जल्दी दर्शन (सुबह 8:00 बजे से पहले)** या **दोपहर के शांत समय** (विशिष्ट मंदिर समय की जाँच करें) का लक्ष्य रखें। कतारों के लिए तैयार रहें, लेकिन शुरुआती घंटों में आमतौर पर शांत दर्शन होते हैं।" },
                { time: "स्थानीय परिवहन (बसें/ऑटो)", advice: "यदि संभव हो तो **कम व्यस्त घंटों** (सुबह के मध्य या दोपहर के मध्य) के दौरान यात्रा करें। तीर्थयात्री प्रवाह को प्रबंधित करने के लिए एपीएसआरटीसी विशेष बसें आयोजित की जाती हैं; उनके नामित मार्गों और शेड्यूल का पालन करें। बढ़े हुए यातायात के कारण कुछ देरी की उम्मीद करें।" },
                { time: "सामान्य भीड़", advice: "सरकार बड़ी भीड़ (8 करोड़+ तीर्थयात्रियों) के लिए योजना बना रही है। आधिकारिक सूचना केंद्रों, 'स्टे होम' बफर जोन और वास्तविक समय की जानकारी के लिए एआई-आधारित भीड़ निगरानी का उपयोग करें। हाइड्रेटेड रहें और धैर्य रखें।" }
            ],
            // Roadmap data
            roadmap: [
                { name: "राजमुंदरी में आगमन", icon: <Plane className="text-blue-500" /> },
                { name: "पुष्कर घाट और गोदावरी आरती", icon: <Umbrella className="text-green-500" /> },
                { name: "पवित्र डुबकी और राजमुंदरी मंदिर", icon: <Sun className="text-yellow-500" /> },
                { name: "हैवलॉक ब्रिज और पर्यावरण-पर्यटन", icon: <Info className="text-purple-500" /> },
                { name: "निडाडावोल और कादियम नर्सरी", icon: <MapPin className="text-red-500" /> },
                { name: "समिस्रागुडेम आरती घाट", icon: <Users className="text-orange-500" /> },
                { name: "राजमुंदरी से प्रस्थान", icon: <Plane className="text-blue-500" /> }
            ],
            // Day 5 details (last day) - re-referenced to English as data is universal
            day5details: [
                { time: "सुबह 07:00 बजे - सुबह 08:00 बजे", activity: "वैकल्पिक अंतिम डुबकी / इत्मीनान से नाश्ता / स्मृति चिन्ह की खरीदारी", significance: "तीर्थयात्रा का शांतिपूर्ण समापन।", location: "राजमुंदरी", notes: "पवित्र नदी के पास आखिरी पल के लिए या किसी भूले हुए स्मृति चिन्ह को लेने का अवसर।" },
                { time: "सुबह 08:00 बजे - सुबह 09:00 बजे", activity: "नाश्ता", significance: "राजमुंदरी में अंतिम भोजन।", location: "स्थानीय/आवास", notes: "अपने रिसॉर्ट/पसंदीदा भोजनालय में आराम से नाश्ते का आनंद लें।" },
                { time: "सुबह 09:00 बजे - सुबह 10:00 बजे", activity: "चेक-आउट", significance: "आवास से औपचारिक प्रस्थान।", location: "आवास", notes: "चेक-आउट औपचारिकताएं पूरी करें।" },
                { time: "सुबह 10:00 बजे से", activity: "राजमुंदरी से प्रस्थान", significance: "आध्यात्मिक यात्रा का समापन।", location: "राजमुंदरी", notes: "परिवहन: राजमुंदरी रेलवे स्टेशन या बस कॉम्प्लेक्स के लिए एपीएसआरटीसी बसें/प्री-बुक्ड कैब, बेंगलुरु वापस अपनी आगे की यात्रा के लिए।" }
            ]
        },
        te: { // Telugu Translations
            header: {
                mainTitle: "గోదావరి పుష్కరాలు 2027: కుటుంబ తీర్థయాత్ర",
                subTitle: "ఒక ప్రశాంతమైన 5-రోజుల ప్రణాళిక (జూలై 23 - ఆగస్టు 3)",
                budgetInfo: "బడ్జెట్: 4 మంది సభ్యులకు ₹50,000",
                crowdTipsBtn: "రద్దీ నివారణ చిట్కాలను చూడండి",
                howBuiltBtn: "ఈ ప్రణాళిక ఎలా రూపొందించబడింది",
            },
            nav: {
                dayPrefix: "రోజు ",
            },
            aside: {
                planByDayTitle: "రోజు వారీ ప్రణాళిక",
                budgetSummaryTitle: "అంచనా బడ్జెట్ విశ్లేషణ",
                budgetNote: "*గమనిక: రాజమండ్రికి రాకపోకల ఖర్చు అత్యంత పెద్దది. ముందుగానే బుక్ చేసుకోవడం మంచిది.",
                aboutPlaceTitle: "స్థలం గురించి",
            },
            main: {
                dayTitlePrefix: "రోజు ",
                significanceLabel: "ప్రాముఖ్యత:",
                locationLabel: "ప్రదేశం:",
                notesLabel: "గమనికలు:",
                tripRoadmapTitle: "యాత్ర మార్గపటం",
                spiritualSignificanceTitle: "గోదావరి పుష్కరాలు: ప్రాముఖ్యత & కర్మలు",
                spiritualSignificanceContent: "గోదావరి పుష్కరాలు (ప్రతి 12 సంవత్సరాలకు ఒకసారి) అత్యంత పవిత్రమైన పండుగ. బృహస్పతి సింహరాశిలోకి ప్రవేశించినప్పుడు గోదావరిలో పవిత్ర స్నానం చేయడం వల్ల అన్ని పాపాలు తొలగిపోతాయని నమ్ముతారు. ఈ కాలం వివిధ కర్మలను (ఆచారాలను) నిర్వహించడానికి చాలా శుభప్రదమైనది:",
                karmasList: [
                    "**పుష్కర స్నానం (పవిత్ర స్నానం):** ఆధ్యాత్మిక శుద్ధికి అత్యంత ముఖ్యమైన ఆచారం.",
                    "**పితృ తర్పణం/శ్రాద్ధం:** దివంగత ఆత్మలకు శాంతి మరియు ఆశీస్సుల కోసం పితృదేవతలకు ప్రార్థనలు మరియు ఆచారాలను సమర్పించడం.",
                    "**దానం (దాతృత్వం):** పేదలకు ఆహారం, వస్త్రాలు లేదా ఇతర వస్తువులను దానం చేయడం చాలా పుణ్యప్రదమైనదిగా పరిగణించబడుతుంది.",
                    "**తీర్థయాత్ర:** నది ఒడ్డున ఉన్న పవిత్ర దేవాలయాలు మరియు పుణ్యక్షేత్రాలను సందర్శించడం.",
                    "**జపం & ధ్యానం:** ఆధ్యాత్మిక ఉన్నతి కోసం మంత్రాలను జపించడం మరియు ధ్యానం చేయడం."
                ],
                govtServicesTitle: "ప్రభుత్వ నిర్దిష్ట సేవలు & చూడవలసినవి:",
                govtServicesContent: "ఆంధ్రప్రదేశ్ ప్రభుత్వం సున్నితమైన మరియు సురక్షితమైన తీర్థయాత్రను నిర్ధారించడానికి విస్తృతమైన ఏర్పాట్లు చేస్తోంది. వీటిని గమనించండి:",
                govtServicesList: [
                    "**APSRTC:** అంతర్-నగర మరియు నగరంలో ప్రయాణానికి ప్రాథమిక ప్రజా రవాణా సాధనం. పుష్కరాల సమయంలో వారు ప్రత్యేక సేవలను నడుపుతారు. షెడ్యూల్ మరియు మార్గాల కోసం వారి అధికారిక వెబ్‌సైట్‌ను తనిఖీ చేయండి.",
                    "**APTDC (ఆంధ్రప్రదేశ్ పర్యాటక అభివృద్ధి సంస్థ):** నమ్మకమైన, బడ్జెట్-స్నేహపూర్వక వసతి కోసం 'హరిత హోటల్స్' లేదా 'APTDC గెస్ట్ హౌస్‌లను' చూడండి. APTDC-నిర్వహించే బోటింగ్ సేవల గురించి విచారించండి. కొన్ని ఆస్తులకు వారి స్వంత రెస్టారెంట్లు ఉన్నాయి, ఇవి పరిశుభ్రమైన స్థానిక వంటకాలను అందిస్తాయి.",
                    "**ప్రభుత్వ క్యాంటీన్లు/ఆహార స్టాల్స్:** ప్రధాన పండుగల సమయంలో, ప్రభుత్వం తరచుగా సబ్సిడీతో కూడిన లేదా నిర్వహించబడే ఆహార పంపిణీ కేంద్రాలు/క్యాంటీన్లను ఏర్పాటు చేస్తుంది. అధికారిక గుర్తును చూడండి.",
                    "**పోలీసు & వైద్య సహాయం:** పండుగ సమయంలో విస్తృతమైన భద్రత మరియు వైద్య సేవలు అందించబడతాయి. నియమించబడిన సహాయ పోస్టులను చూడండి.",
                    "**సమాచార కేంద్రాలు:** తీర్థయాత్రకులకు మార్గనిర్దేశం చేయడానికి కీలక ప్రదేశాలలో అధికారిక ప్రభుత్వ సమాచార కియోస్క్‌లు ఏర్పాటు చేయబడతాయి."
                ],
            },
            footer: {
                copyright: "గోదావరి పుష్కరాలు ట్రిప్ ప్లానర్. అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి.",
            },
            modals: {
                crowdTipsTitle: "రద్దీ నిర్వహణ & చిట్కాలు",
                crowdTipsGotIt: "అర్థమైంది!",
                dataBenefitTitle: "ఈ ప్రణాళిక ఎలా రూపొందించబడింది",
                dataBenefitContent1: "మీరు అందించిన **'అఖండ గోదావరి పర్యాటక ప్రాజెక్ట్ నివేదిక.పిడిఎఫ్'** నుండి వివరణాత్మక సమాచారాన్ని ఉపయోగించి ఈ ఇంటరాక్టివ్ ప్రణాళిక ప్రధానంగా రూపొందించబడింది.",
                dataBenefitList: [
                    "PDF యొక్క అంతర్దృష్టులు భవిష్యత్ అభివృద్ధిలైన **హావెలాక్ వంతెన ఆకర్షణలు (గ్లాస్ బ్రిడ్జ్, సొరంగాలు, మొదలైనవి)**, **టెంట్ సిటీ**, మరియు నిర్దిష్ట ఘాట్‌ల పునరుద్ధరణ వంటి వాటికి సంబంధించినవి, ఇవి ఒక ప్రత్యేకమైన, భవిష్యత్‌ను చూసే యాత్ర ప్రణాళికను రూపొందించడానికి మాకు సహాయపడ్డాయి.",
                    "**కదియం నర్సరీ** మరియు **నిడదవోలులోని శ్రీ కోట సత్తెమ్మ ఆలయం** వంటి ప్రదేశాల గురించిన సమాచారం ప్రధాన రాజమండ్రి ప్రదేశాలకు మించి యాత్రను వైవిధ్యపరచడానికి సహాయపడింది.",
                    "PDFలో పేర్కొన్న ప్రాజెక్ట్ స్థాయి మరియు ప్రభుత్వ ప్రమేయం, విశ్వసనీయత మరియు బడ్జెట్ సామర్థ్యం కోసం **ప్రభుత్వ మద్దతుగల సేవలను (APSRTC, APTDC)** సిఫార్సు చేయడానికి మార్గనిర్దేశం చేసింది."
                ],
                dataBenefitContent2: "ఒక ఎక్సెల్ షీట్ సూచించబడినప్పటికీ, ఈ సిస్టమ్‌కు బాహ్య స్ప్రెడ్‌షీట్ లింక్‌ల నుండి నేరుగా డేటాను సంగ్రహించడం సాధ్యం కాదు. యాత్ర ప్రణాళిక డేటా అందించబడిన సుసంపన్నమైన వచన వివరాల నుండి నిర్మాణాత్మకంగా మరియు ఏకీకృతంగా ఉంది, ఇది ఇంటరాక్టివ్‌గా మరియు సులభంగా అన్వేషించదగినదిగా మారింది.",
                dataBenefitClose: "మూసివేయండి",
            },
            itinerary: [
                {
                    day: 1,
                    title: "రాక & సాయంత్రం హారతి – ప్రశాంతమైన ప్రారంభం",
                    details: [
                        { time: "ఉదయం 08:00 - మధ్యాహ్నం 12:00", activity: "రాజమండ్రికి ప్రయాణం & చేరుకోవడం, బదిలీ & చెక్-ఇన్", significance: "తీర్థయాత్రకు కొత్త ప్రారంభం.", location: "రాజమండ్రి", notes: "రవాణా: APSRTC ప్రత్యేక పుష్కరాలు బస్సులు/ప్రభుత్వ అద్దె క్యాబ్‌లు. వసతి: APTDC హరిత రిసార్ట్‌లు/ప్రభుత్వ అతిథి గృహాలకు ప్రాధాన్యత ఇవ్వండి (వెంటనే బుక్ చేసుకోండి!). ఆహారం: APTDC రెస్టారెంట్/ప్రభుత్వ క్యాంటీన్." },
                        { time: "మధ్యాహ్నం 12:00 - మధ్యాహ్నం 02:00", activity: "చెక్-ఇన్ & భోజనం", significance: "ఆధ్యాత్మిక యాత్రకు సిద్ధం కావాలి.", location: "వసతి ప్రాంతం", notes: "సాంప్రదాయ ఆంధ్ర శాఖాహార భోజనం ఆస్వాదించండి." },
                        { time: "మధ్యాహ్నం 02:00 - సాయంత్రం 05:00", activity: "విశ్రాంతి & సాయంత్రం ఆచారానికి సన్నాహాలు", significance: "కుటుంబ బంధానికి, ఆధ్యాత్మిక సంసిద్ధతకు సమయం.", location: "వసతి ప్రాంతం", notes: "ప్రధాన సాయంత్రం ఈవెంట్‌కు ముందు రీఛార్జ్ చేసుకోండి." },
                        { time: "సాయంత్రం 05:00 - రాత్రి 08:00", activity: "పునరుద్ధరించిన పుష్కర ఘాట్‌ల వద్ద గ్రాండ్ గోదావరి హారతిని చూడండి", significance: "శాంతి, శ్రేయస్సు కోసం గోదావరి నదికి దివ్య అగ్ని సమర్పణను చూడటం.", location: "పుష్కర ఘాట్లు", notes: "అనుభవం: మెరుగైన ఆధ్యాత్మిక మరియు ఘాట్-ఫ్రంట్ మౌలిక సదుపాయాలు. రద్దీ వ్యూహం: మంచి వీక్షణ స్థలం కోసం ముందుగానే చేరుకోండి. భద్రత: అధికారిక రద్దీ నిర్వహణ & భద్రతపై ఆధారపడండి." },
                        { time: "రాత్రి 08:00 - రాత్రి 09:30", activity: "రాత్రి భోజనం & విశ్రాంతి", significance: "పోషణ మరియు విశ్రాంతితో రోజును ముగించండి.", location: "స్థానిక/వసతి", notes: "నమ్మకమైన రెస్టారెంట్ లేదా మీ APTDC రిసార్ట్‌లో స్థానిక ఆంధ్ర శాఖాహార వంటకాలను ఆస్వాదించండి." }
                    ]
                },
                {
                    day: 2,
                    title: "శుభప్రదమైన పవిత్ర స్నానం & రాజమండ్రి దేవాలయాలు",
                    details: [
                        { time: "ఉదయం 04:00 - ఉదయం 06:30", activity: "**పవిత్ర స్నానం (పుష్కర స్నానం)** తక్కువ రద్దీ ఉన్న ఘాట్‌ల వద్ద", significance: "పాప ప్రక్షాళన, ఆధ్యాత్మిక శుద్ధి (కర్మ: స్నానం & పితృ తర్పణం).", location: "సరస్వతి/గౌతమి ఘాట్‌లు (లేదా బాగా నిర్వహించబడిన పుష్కర ఘాట్)", notes: "రద్దీ వ్యూహం: ప్రశాంతత కోసం ఉదయం 6:00 గంటల ముందు ప్రారంభించండి. దృష్టి: ప్రశాంతమైన ధ్యానం & కుటుంబ బంధానికి ప్రాధాన్యత ఇవ్వండి. కర్మలు: పితృదేవతలకు సాధారణ నీటి సమర్పణలు (పితృ తర్పణం) చేయండి మరియు ప్రార్థనలు చేయండి." },
                        { time: "ఉదయం 07:00 - ఉదయం 08:00", activity: "అల్పాహారం", significance: "పవిత్ర స్నానం తర్వాత శక్తిని తిరిగి నింపండి.", location: "స్థానిక/వసతి", notes: "సమీపంలోని ప్రభుత్వ ఆమోదిత క్యాంటీన్ లేదా చిన్న స్థానిక భోజనశాలలో త్వరితమైన, పరిశుభ్రమైన అల్పాహారం (ఇడ్లీ, దోస, పెసరట్టు) తీసుకోండి." },
                        { time: "ఉదయం 08:30 - మధ్యాహ్నం 12:30", activity: "ఆలయ యాత్ర: కోటిలింగేశ్వర స్వామి, మార్కండేయ స్వామి, ఇస్కాన్ ఆలయం", significance: "ప్రాచీన దేవతల నుండి ఆశీస్సులు పొందడం, ఆధ్యాత్మిక ఉన్నతి (కర్మ: తీర్థయాత్ర & దర్శనం).", location: "రాజమండ్రి", notes: "రవాణా: APSRTC సిటీ బస్సులు/ఆటోలు. ప్రాముఖ్యత: కోటిలింగేశ్వర (ప్రాచీన శివ), మార్కండేయ (పౌరాణిక ఋషి), ఇస్కాన్ (హరే కృష్ణ ఉద్యమం, ప్రశాంతమైన)." },
                        { time: "మధ్యాహ్నం 12:30 - మధ్యాహ్నం 02:00", activity: "భోజనం & విశ్రాంతి", significance: "మధ్యాహ్నం కోసం విశ్రాంతి తీసుకోండి మరియు రీఛార్జ్ చేసుకోండి.", location: "స్థానిక/వసతి", notes: "పూర్తి ఆంధ్ర భోజనం ఆస్వాదించండి. విశ్రాంతి కోసం వసతికి తిరిగి వెళ్ళండి." },
                        { time: "సాయంత్రం 04:00 - సాయంత్రం 07:00", activity: "స్థానిక అన్వేషణ & విశ్రాంతి", significance: "స్థానిక సంస్కృతి మరియు ప్రశాంతమైన నది దృశ్యాలను అనుభవించండి.", location: "రాజమండ్రి మెయిన్ రోడ్", notes: "ప్రామాణికమైన ఆంధ్ర హస్తకళలు మరియు స్థానిక చిరుతిండ్ల కోసం అన్వేషించండి." },
                        { time: "రాత్రి 07:30 నుండి", activity: "రాత్రి భోజనం & కుటుంబ సమయం", significance: "బంధం మరియు విశ్రాంతి.", location: "స్థానిక/వసతి", notes: "మీ కుటుంబంతో ఒక రుచికరమైన రాత్రి భోజనం ఆస్వాదించండి." }
                    ]
                },
                {
                    day: 3,
                    title: "హావెలాక్ బ్రిడ్జ్ మార్పు & పర్యావరణ-పర్యాటకం",
                    details: [
                        { time: "ఉదయం 08:00 - ఉదయం 09:00", activity: "అల్పాహారం", significance: "అన్వేషణ దినం కోసం సిద్ధం చేయండి.", location: "స్థానిక/వసతి", notes: "" },
                        { time: "ఉదయం 09:00 - మధ్యాహ్నం 01:00", activity: "**హావెలాక్ బ్రిడ్జ్ పునరాభివృద్ధి అనుభవం**", significance: "చరిత్ర, సాంకేతికత మరియు వినోదం కలయిక.", location: "హావెలాక్ బ్రిడ్జ్", notes: "ముఖ్యాంశం: గ్లాస్ బ్రిడ్జ్, జలపాత జోన్, రైల్ మ్యూజియం, ఆక్వేరియం టన్నెల్ (అఖండ గోదావరి ప్రాజెక్ట్ ప్రకారం) అన్వేషించండి. సౌకర్యం: ఆధునిక సౌకర్యాలతో ప్రధాన పర్యాటక ఆకర్షణగా రూపొందించబడింది. బడ్జెట్ గమనిక: వివిధ జోన్‌లకు ప్రవేశ రుసుములను కేటాయించండి." },
                        { time: "మధ్యాహ్నం 01:00 - మధ్యాహ్నం 02:00", activity: "భోజనం", significance: "ఉదయపు కార్యకలాపాల తర్వాత రీఛార్జ్ చేయండి.", location: "బ్రిడ్జ్ లంక/హావెలాక్ బ్రిడ్జ్ ప్రాంతం సమీపంలో", notes: "ప్రభుత్వ ఆమోదిత ఆహార స్టాల్స్ లేదా APTDC సదుపాయం కోసం చూడండి." },
                        { time: "మధ్యాహ్నం 02:30 - సాయంత్రం 06:00", activity: "బ్రిడ్జ్ లంక & టెంట్ సిటీ ఎకో-టూరిజం (బోటింగ్, విశ్రాంతి)", significance: "ప్రకృతితో అనుసంధానం, ప్రశాంతమైన నది కార్యకలాపాలు.", location: "బ్రిడ్జ్ లంక/టెంట్ సిటీ ప్రాంతం", notes: "కార్యకలాపం: కుటుంబ స్నేహపూర్వక నది అనుభవం కోసం APTDC-నిర్వహించే బోటింగ్ సేవల గురించి విచారించండి. పర్యావరణం: ప్రణాళికాబద్ధమైన పర్యావరణ-పర్యాటక ఆకర్షణలను ఆస్వాదించండి." },
                        { time: "సాయంత్రం 06:30 - సాయంత్రం 07:30", activity: "రాజమండ్రికి తిరిగి వెళ్ళండి", significance: "స్థావరానికి తిరిగి ప్రయాణం.", location: "రాజమండ్రి", notes: "" },
                        { time: "రాత్రి 07:30 నుండి", activity: "రాత్రి భోజనం & విశ్రాంతి", significance: "విశ్రాంతి తీసుకోండి.", location: "స్థానిక/వసతి", notes: "" }
                    ]
                },
                {
                    day: 4,
                    title: "నిడదవోలు & కదియం నర్సరీ – సంస్కృతి మరియు ప్రకృతి",
                    details: [
                        { time: "ఉదయం 07:00 - ఉదయం 08:00", activity: "అల్పాహారం", significance: "రోజువారీ యాత్రకు సిద్ధం చేయండి.", location: "స్థానిక/వసతి", notes: "" },
                        { time: "ఉదయం 08:00 - మధ్యాహ్నం 12:00", activity: "నిడదవోలుకు రోజువారీ యాత్ర: శ్రీ కోట సత్తెమ్మ ఆలయం", significance: "ప్రాంతీయ భక్తిని, నిశ్శబ్ద ఆధ్యాత్మిక వాతావరణాన్ని అనుభవించడం.", location: "నిడదవోలు", notes: "రవాణా: APSRTC అంతర్-నగర బస్సు (సుమారు 45-60 నిమిషాలు, తక్కువ ఖర్చు). ప్రాముఖ్యత: రద్దీ లేని, అందంగా ఆధునీకరించబడిన ఆలయాన్ని సందర్శించండి." },
                        { time: "మధ్యాహ్నం 12:00 - మధ్యాహ్నం 01:00", activity: "కదియానికి ప్రయాణం & భోజనం", significance: "తదుపరి గమ్యస్థానానికి మారడం.", location: "కదియం", notes: "నిడదవోలు నుండి కదియానికి స్థానిక ఆటో లేదా షేర్డ్ ప్రభుత్వ-ఆమోదిత రవాణాను తీసుకోండి. కదియంలోని స్థానిక, పరిశుభ్రమైన భోజనశాలలో భోజనం చేయండి." },
                        { time: "మధ్యాహ్నం 01:00 - సాయంత్రం 04:00", activity: "కదియం నర్సరీ అనుభవ కేంద్రం (పునరుద్ధరించబడింది)", significance: "ప్రకృతి ఆస్వాదన, విశ్రాంతి, ప్రత్యేకమైన స్థానిక అనుభవం.", location: "కదియం", notes: "కార్యకలాపం: విస్తారమైన అలంకారమైన మొక్కల నర్సరీలను అన్వేషించండి, కుటుంబానికి ఆహ్లాదకరమైన మరియు ప్రశాంతమైన అనుభవం. ఫోటోగ్రఫీకి అనువైనది." },
                        { time: "సాయంత్రం 04:30 - సాయంత్రం 05:30", activity: "రాజమండ్రికి తిరిగి వెళ్ళండి", significance: "స్థావరానికి తిరిగి ప్రయాణం.", location: "రాజమండ్రి", notes: "APSRTC బస్సు/షేర్డ్ ఆటో." },
                        { time: "సాయంత్రం 05:30 - సాయంత్రం 07:00", activity: "సమిస్రగూడెం హారతి ఘాట్", significance: "కాలువ ప్రాంతంలో సన్నిహిత ఆధ్యాత్మిక అభివృద్ధి.", location: "సమిస్రగూడెం", notes: "ప్రార్థన మరియు ధ్యానం కోసం మరింత ప్రశాంతమైన ప్రత్యామ్నాయం." },
                        { time: "రాత్రి 07:30 నుండి", activity: "వీడ్కోలు విందు & ప్రతిబింబం", significance: "తీర్థయాత్ర యొక్క కుటుంబ సమయం మరియు జ్ఞాపకాలను ఆదరించడం.", location: "రాజమండ్రి", notes: "చివరి ఆంధ్ర విందును ఆస్వాదించండి." }
                    ]
                }
            ],
            // Budget data (re-referenced to English as costs are universal)
            budget: [
                { item: "వసతి (5 రాత్రులు x ₹1500/రాత్రి)", cost: "₹7,500" },
                { item: "ఆహారం (₹400/వ్యక్తి/రోజు x 4 వ్యక్తులు x 5 రోజులు)", cost: "₹8,000" },
                { item: "స్థానిక రవాణా (APSRTC ప్రత్యేక బస్సులు/ప్రభుత్వ అద్దె క్యాబ్‌లు)", cost: "₹7,500" },
                { item: "ప్రవేశ రుసుములు/కార్యకలాపాలు/విరాళాలు", cost: "₹4,000" },
                { item: "ఇతరాలు/అత్యవసర నిధి", cost: "₹3,000" },
                { item: "రాజమండ్రికి రాకపోకలు (బెంగళూరు నుండి రైలు/బస్సు)", cost: "₹20,000" },
                { item: "**మొత్తం అంచనా బడ్జెట్**", cost: "**₹50,000**" }
            ],
            // Place info data
            placeInfo: {
                rajahmundry: {
                    title: "రాజమండ్రి: ఆంధ్రప్రదేశ్ సాంస్కృతిక రాజధాని",
                    description: "రాజమండ్రి, రాజమహేంద్రవరం అని కూడా పిలుస్తారు, ఇది గోదావరి నది ఒడ్డున ఉన్న ఒక చారిత్రక నగరం. ఇది తన గొప్ప సాంస్కృతిక వారసత్వం, పురాతన దేవాలయాలు మరియు ముఖ్యంగా పుష్కరాల పండుగ సమయంలో ఒక ముఖ్యమైన తీర్థయాత్ర కేంద్రంగా ప్రసిద్ధి చెందింది. తెలుగు సాహిత్యం, కళ మరియు సినిమాకు చేసిన కృషి కారణంగా దీనిని తరచుగా 'ఆంధ్రప్రదేశ్ సాంస్కృతిక రాజధాని' అని పిలుస్తారు. ఈ నగరం 2027 పుష్కరాల కోసం విస్తృతంగా సన్నద్ధమవుతోంది, తీర్థయాత్ర సౌకర్యాలు మరియు పర్యాటక ఆకర్షణలను మెరుగుపరచడం లక్ష్యంగా పెట్టుకుంది.",
                },
                godavariRiver: {
                    title: "గోదావరి నది: 'దక్షిణ గంగ'",
                    description: "గోదావరి నది భారతదేశంలో రెండవ పొడవైన నది మరియు హిందూ మతం యొక్క ఏడు పవిత్ర నదులలో ఒకటిగా పరిగణించబడుతుంది. మహారాష్ట్రలోని నాసిక్‌లో ఉద్భవించి, ఇది తూర్పున ఆంధ్రప్రదేశ్ మరియు తెలంగాణ మీదుగా ప్రవహించి బంగాళాఖాతంలో కలుస్తుంది. ఈ నదిని 'దక్షిణ గంగ' అని పూజిస్తారు మరియు అనేక పౌరాణిక కథలు మరియు ఆధ్యాత్మిక ఆచారాలకు కేంద్రం. పుష్కరాల సమయంలో దాని నీటిలో స్నానం చేయడం ఆత్మను శుద్ధి చేసి ఆధ్యాత్మిక విముక్తిని ఇస్తుందని నమ్ముతారు.",
                }
            },
            // Crowd tips data
            crowdTips: [
                { time: "పవిత్ర స్నానం (పుష్కర స్నానం)", advice: "ఉత్తమ సమయాలు **ఉదయం తొందరగా (ఉదయం 6:00 ముందు)** లేదా **సాయంత్రం ఆలస్యంగా (రాత్రి 8:00 తర్వాత)**. మరింత ప్రశాంతమైన అనుభవం కోసం మధ్యాహ్నపు రద్దీ సమయాలను నివారించండి. ప్రధాన పుష్కర ఘాట్‌లు చాలా రద్దీగా ఉంటే సరస్వతి ఘాట్ లేదా గౌతమి ఘాట్ వంటి తక్కువ రద్దీ ఉన్న ఘాట్‌లను పరిగణించండి. ప్రభుత్వం విడదీసిన రద్దీ మార్గాలను మరియు సమర్థవంతమైన ఘాట్ వినియోగాన్ని లక్ష్యంగా పెట్టుకుంది." },
                { time: "హావెలాక్ బ్రిడ్జ్ ఆకర్షణలు", advice: "ఖుల్లుగా ఉన్న వెంటనే **(సుమారు ఉదయం 9:00)** లేదా **సాయంత్రం ఆలస్యంగా (సాయంత్రం 4:00 తర్వాత)** సందర్శించండి. మధ్యాహ్నం చాలా రద్దీగా ఉండే అవకాశం ఉంది. నియమించబడిన ప్రవేశ/నిష్క్రమణ స్థలాలపై ప్రభుత్వ మార్గదర్శకాలను ఉపయోగించండి." },
                { time: "ప్రసిద్ధ దేవాలయాలు (కోటిలింగేశ్వర స్వామి, మార్కండేయ)", advice: "**ఉదయం తొందరగా దర్శనం (ఉదయం 8:00 ముందు)** లేదా **మధ్యాహ్నపు విశ్రాంతి సమయాలలో** (నిర్దిష్ట ఆలయ సమయాలను తనిఖీ చేయండి) లక్ష్యంగా పెట్టుకోండి. క్యూల కోసం సిద్ధంగా ఉండండి, కానీ తొందరగా వెళ్తే సాధారణంగా ప్రశాంతమైన దర్శనం ఉంటుంది." },
                { time: "స్థానిక రవాణా (బస్సులు/ఆటోలు)", advice: "సాధ్యమైతే **రద్దీ లేని సమయాల్లో** (ఉదయం మధ్యలో లేదా మధ్యాహ్నం మధ్యలో) ప్రయాణించండి. తీర్థయాత్రికుల ప్రవాహాన్ని నిర్వహించడానికి APSRTC ప్రత్యేక బస్సులు ఏర్పాటు చేయబడ్డాయి; వాటి నియమించబడిన మార్గాలు మరియు షెడ్యూల్‌లను అనుసరించండి. పెరిగిన ట్రాఫిక్ కారణంగా కొంత జాప్యం ఆశించవచ్చు." },
                { time: "సాధారణ రద్దీ", advice: "ప్రభుత్వం భారీ రద్దీ (8 కోట్ల మందికి పైగా యాత్రికులు) కోసం ప్రణాళిక వేస్తోంది. అధికారిక సమాచార కేంద్రాలు, 'స్టే హోమ్' బఫర్ జోన్‌లు మరియు రియల్-టైమ్ అప్‌డేట్‌ల కోసం AI-ఆధారిత రద్దీ పర్యవేక్షణను ఉపయోగించండి. హైడ్రేటెడ్‌గా ఉండండి మరియు ఓపికగా ఉండండి." }
            ],
            // Roadmap data
            roadmap: [
                { name: "రాజమండ్రికి రాక", icon: <Plane className="text-blue-500" /> },
                { name: "పుష్కర ఘాట్లు & గోదావరి హారతి", icon: <Umbrella className="text-green-500" /> },
                { name: "పవిత్ర స్నానం & రాజమండ్రి దేవాలయాలు", icon: <Sun className="text-yellow-500" /> },
                { name: "హావెలాక్ బ్రిడ్జ్ & పర్యావరణ-పర్యాటకం", icon: <Info className="text-purple-500" /> },
                { name: "నిడదవోలు & కదియం నర్సరీ", icon: <MapPin className="text-red-500" /> },
                { name: "సమిస్రగూడెం హారతి ఘాట్", icon: <Users className="text-orange-500" /> },
                { name: "రాజమండ్రి నుండి నిష్క్రమణ", icon: <Plane className="text-blue-500" /> }
            ],
            // Day 5 details (last day) - re-referenced to English as data is universal
            day5details: [
                { time: "ఉదయం 07:00 - ఉదయం 08:00", activity: "ఐచ్ఛిక చివరి స్నానం / తీరికగా అల్పాహారం / స్మృతి చిహ్నాల షాపింగ్", significance: "తీర్థయాత్రకు ప్రశాంతమైన ముగింపు.", location: "రాజమండ్రి", notes: "పవిత్ర నది దగ్గర చివరి క్షణం ఆస్వాదించడానికి లేదా మర్చిపోయిన స్మృతి చిహ్నాలను కొనుగోలు చేయడానికి అవకాశం." },
                { time: "ఉదయం 08:00 - ఉదయం 09:00", activity: "అల్పాహారం", significance: "రాజమండ్రిలో చివరి భోజనం.", location: "స్థానిక/వసతి", notes: "మీ రిసార్ట్/ఇష్టమైన భోజనశాలలో ప్రశాంతమైన అల్పాహారం ఆస్వాదించండి." },
                { time: "ఉదయం 09:00 - ఉదయం 10:00", activity: "చెక్-అవుట్", significance: "వసతి నుండి అధికారిక నిష్క్రమణ.", location: "వసతి", notes: "చెక్-అవుట్ లాంఛనాలను పూర్తి చేయండి." },
                { time: "ఉదయం 10:00 నుండి", activity: "రాజమండ్రి నుండి నిష్క్రమణ", significance: "ఆధ్యాత్మిక యాత్ర ముగింపు.", location: "రాజమండ్రి", notes: "రవాణా: రాజమండ్రి రైల్వే స్టేషన్ లేదా బస్ కాంప్లెక్స్‌కి APSRTC బస్సులు/ముందుగా బుక్ చేసుకున్న క్యాబ్‌లు, బెంగళూరుకు మీ తదుపరి ప్రయాణం కోసం." }
            ]
        },
    };

    // Dynamically select the current language data
    const currentLangData = translations[currentLanguage];

    // Due to the deep nesting and structure of itinerary, placeInfo, etc.,
    // we need to provide the full data structure for each language.
    // This makes the code verbose but ensures all content is translated.
    const itineraryData = currentLangData.itinerary;
    const budgetData = currentLangData.budget;
    const placeInfoData = currentLangData.placeInfo;
    const crowdTipsData = currentLangData.crowdTips;
    const roadmapData = currentLangData.roadmap;
    const spiritualDetailsData = [
        {
            heading: currentLangData.main.spiritualSignificanceTitle,
            content: currentLangData.main.spiritualSignificanceContent,
            list: currentLangData.main.karmasList,
        },
        {
            heading: currentLangData.main.govtServicesTitle,
            content: currentLangData.main.govtServicesContent,
            list: currentLangData.main.govtServicesList,
        },
    ];

    const currentDayData = itineraryData.find(dayData => dayData.day === selectedDay);

    // Modal Component for Crowd Tips
    const CrowdTipsModal = ({ isOpen, onClose, tips }) => {
        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 max-w-lg w-full relative">
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <XCircle size={28} />
                    </button>
                    <h2 className="text-2xl font-bold text-purple-700 mb-4">{currentLangData.modals.crowdTipsTitle}</h2>
                    <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                        {tips.map((tip, index) => (
                            <div key={index} className="border-l-4 border-blue-500 pl-3">
                                <h3 className="font-semibold text-lg text-gray-900">{tip.time}</h3>
                                <p className="text-gray-700 text-sm" dangerouslySetInnerHTML={{ __html: tip.advice }} />
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={onClose}
                        className="mt-6 w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors shadow-md"
                    >
                        {currentLangData.modals.crowdTipsGotIt}
                    </button>
                </div>
            </div>
        );
    };

    // New Modal Component for Data Benefit
    const DataBenefitModal = ({ isOpen, onClose }) => {
        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 max-w-lg w-full relative">
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <XCircle size={28} />
                    </button>
                    <h2 className="text-2xl font-bold text-teal-700 mb-4">{currentLangData.modals.dataBenefitTitle}</h2>
                    <div className="space-y-4 text-gray-700">
                        <p dangerouslySetInnerHTML={{ __html: currentLangData.modals.dataBenefitContent1 }} />
                        <ul className="list-disc list-inside space-y-2">
                            {currentLangData.modals.dataBenefitList.map((item, idx) => (
                                <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
                            ))}
                        </ul>
                        <p dangerouslySetInnerHTML={{ __html: currentLangData.modals.dataBenefitContent2 }} />
                    </div>
                    <button
                        onClick={onClose}
                        className="mt-6 w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors shadow-md"
                    >
                        {currentLangData.modals.dataBenefitClose}
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="font-sans antialiased bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 min-h-screen text-gray-800 p-4 sm:p-6 lg:p-8">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
                body {
                    font-family: 'Inter', sans-serif;
                }
                `}
            </style>

            {/* Modals */}
            <CrowdTipsModal isOpen={isCrowdModalOpen} onClose={() => setIsCrowdModalOpen(false)} tips={crowdTipsData} />
            <DataBenefitModal isOpen={isDataBenefitModalOpen} onClose={() => setIsDataBenefitModalOpen(false)} />

            {/* Header */}
            <header className="text-center mb-10 bg-white p-6 rounded-xl shadow-lg">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-purple-700 mb-2">
                    {currentLangData.header.mainTitle}
                </h1>
                <p className="text-lg sm:text-xl text-gray-600">{currentLangData.header.subTitle}</p>
                <p className="text-md sm:text-lg text-gray-500 mt-1">{currentLangData.header.budgetInfo}</p>
                <div className="flex flex-col sm:flex-row justify-center items-center mt-4 space-y-3 sm:space-y-0 sm:space-x-4">
                    <button
                        onClick={() => setIsCrowdModalOpen(true)}
                        className="bg-orange-500 text-white py-2 px-6 rounded-full font-semibold hover:bg-orange-600 transition-colors shadow-md flex items-center justify-center w-full sm:w-auto"
                    >
                        <Users size={20} className="mr-2" /> {currentLangData.header.crowdTipsBtn}
                    </button>
                    <button
                        onClick={() => setIsDataBenefitModalOpen(true)}
                        className="bg-teal-500 text-white py-2 px-6 rounded-full font-semibold hover:bg-teal-600 transition-colors shadow-md flex items-center justify-center w-full sm:w-auto"
                    >
                        <Database size={20} className="mr-2" /> {currentLangData.header.howBuiltBtn}
                    </button>
                    {/* Language Selection Buttons */}
                    <div className="flex space-x-2 bg-gray-100 p-2 rounded-full shadow-inner">
                        <button
                            onClick={() => setCurrentLanguage('en')}
                            className={`py-1 px-3 rounded-full text-sm font-medium ${currentLanguage === 'en' ? 'bg-blue-600 text-white' : 'text-blue-700 hover:bg-blue-200'}`}
                        >
                            EN
                        </button>
                        <button
                            onClick={() => setCurrentLanguage('hi')}
                            className={`py-1 px-3 rounded-full text-sm font-medium ${currentLanguage === 'hi' ? 'bg-blue-600 text-white' : 'text-blue-700 hover:bg-blue-200'}`}
                        >
                            HI
                        </button>
                        <button
                            onClick={() => setCurrentLanguage('te')}
                            className={`py-1 px-3 rounded-full text-sm font-medium ${currentLanguage === 'te' ? 'bg-blue-600 text-white' : 'text-blue-700 hover:bg-blue-200'}`}
                        >
                            TE
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Day Navigation & Budget */}
                <aside className="lg:col-span-1 space-y-8">
                    {/* Day Navigation */}
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <h2 className="text-2xl font-semibold text-purple-600 mb-4">{currentLangData.aside.planByDayTitle}</h2>
                        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-3 xl:grid-cols-5 gap-3">
                            {itineraryData.map((dayData) => (
                                <button
                                    key={dayData.day}
                                    onClick={() => setSelectedDay(dayData.day)}
                                    className={`py-3 px-4 rounded-lg font-medium text-lg transition-all duration-300 shadow-md
                                        ${selectedDay === dayData.day
                                            ? 'bg-purple-600 text-white transform scale-105 border-2 border-purple-800'
                                            : 'bg-purple-100 text-purple-800 hover:bg-purple-200 hover:text-purple-900 border-2 border-purple-300'
                                        }`}
                                >
                                    {currentLangData.nav.dayPrefix} {dayData.day}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Budget Summary */}
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <h2 className="text-2xl font-semibold text-pink-600 mb-4">{currentLangData.aside.budgetSummaryTitle}</h2>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            {budgetData.map((item, index) => (
                                <li key={index} className={item.item.includes("Total") ? "font-bold text-pink-700" : ""}>
                                    {item.item}: <span className="font-medium">{item.cost}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="text-sm text-gray-500 mt-4">
                            {currentLangData.aside.budgetNote}
                        </p>
                    </div>

                    {/* Quick Place Info */}
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">{currentLangData.aside.aboutPlaceTitle}</h2>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <span className="mr-2 mt-1">{placeInfoData.rajahmundry.icon}</span>
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-900">{placeInfoData.rajahmundry.title}</h3>
                                    <p className="text-gray-700 text-sm">{placeInfoData.rajahmundry.description}</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <span className="mr-2 mt-1">{placeInfoData.godavariRiver.icon}</span>
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-900">{placeInfoData.godavariRiver.title}</h3>
                                    <p className="text-gray-700 text-sm">{placeInfoData.godavariRiver.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </aside>

                {/* Right Column: Day Details & Spiritual Info */}
                <main className="lg:col-span-2 space-y-8">
                    {/* Current Day Details */}
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <h2 className="text-2xl sm:text-3xl font-semibold text-blue-600 mb-4">
                            {currentLangData.main.dayTitlePrefix} {currentDayData.day}: {currentDayData.title}
                        </h2>
                        <div className="space-y-6">
                            {currentDayData.details.map((activity, index) => (
                                <div key={index} className="border-l-4 border-blue-400 pl-4 py-2">
                                    <h3 className="text-xl font-medium text-gray-900 mb-1">{activity.time} - {activity.activity}</h3>
                                    <p className="text-gray-700 mb-1">
                                        <span className="font-semibold">{currentLangData.main.significanceLabel}</span> {activity.significance}
                                    </p>
                                    <p className="text-gray-700 mb-1">
                                        <span className="font-semibold">{currentLangData.main.locationLabel}</span> {activity.location}
                                    </p>
                                    <p className="text-gray-600 text-sm italic">
                                        <span className="font-semibold">{currentLangData.main.notesLabel}</span> {activity.notes}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Trip Roadmap/Flowchart */}
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <h2 className="text-2xl font-semibold text-emerald-600 mb-4">{currentLangData.main.tripRoadmapTitle}</h2>
                        <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center">
                            {roadmapData.map((step, index) => (
                                <React.Fragment key={index}>
                                    <div className="flex flex-col items-center p-2 text-center w-28 sm:w-36">
                                        <div className="p-3 bg-emerald-100 rounded-full mb-2 shadow-md">
                                            {step.icon}
                                        </div>
                                        <span className="text-sm font-medium text-gray-700">{step.name}</span>
                                    </div>
                                    {index < roadmapData.length - 1 && (
                                        <div className="flex-grow w-px h-6 sm:w-6 sm:h-px bg-emerald-300 transform sm:rotate-0 rotate-90 my-2 sm:my-0"></div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>


                    {/* Spiritual Significance & Government Services */}
                    {spiritualDetailsData.map((section, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                            <h2 className="text-2xl font-semibold text-green-700 mb-4">{section.heading}</h2>
                            <p className="text-gray-700 mb-4">{section.content}</p>
                            <ul className="list-disc list-inside text-gray-700 space-y-2">
                                {section.list.map((item, idx) => (
                                    <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
                                ))}
                            </ul>
                        </div>
                    ))}
                </main>
            </div>

            {/* Footer */}
            <footer className="text-center mt-10 p-4 text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} {currentLangData.footer.copyright}
            </footer>
        </div>
    );
};

export default App;

