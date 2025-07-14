import cont1 from '../../assets/Img/cont1.png'
import cont2 from '../../assets/Img/cont2.png'
import cont3 from '../../assets/Img/cont3.png'

const ContentSection = () => {
  const sections = [
    {
      imageUrl: cont1,
      dir: false,
      title: `See top attractions and  <br /> restaurants from the entire web`,
      description:
        'Get recommended the top places to visit and the <br /> best restaurants Get ratings for top attractions, <br /> check their opening hours, and access links to <br /> official websites. We’ve gathered the top <br /> attractions from across the web in one place so <br /> you can see what are the consensus picks.',
    },
    {
      imageUrl: cont2,
      dir: true,
      title: 'Create a trip itinerary to see <br/> everything in one place',
      description:
        'Add the attractions you want to visit and see <br /> how to go between them on a map. Check <br /> distances and travel times between locations and <br /> attractions, schedule specific times for your <br /> visits, and optimize your route so you can make <br /> the most of your trip. See your flights and hotels <br /> for the day to keep track of what’s coming up.',
    },
    {
      imageUrl: cont3,
      dir: false,
      title: 'Booking Hotels at any place you <br /> want',
      description:
        'Add the attractions you want to visit and see <br /> how to go between them on a map. Check <br /> distances and travel times between locations and <br /> attractions, schedule specific times for your <br /> visits, and optimize your route so you can make <br /> the most of your trip. See your flights and hotels <br /> for the day to keep track of what’s coming up..',
    },
  ]

  return (
    <div className="container mx-auto py-10 mt-12">
      {sections.map((section, index) => (
        <div
          key={index}
          className={`flex flex-col items-start mb-8 p-4 md:gap-8
             ${section.dir ? ' lg:flex-row-reverse' : ' lg:flex-row'}`}
        >
          <div className="w-full lg:w-1/2">
            <img
              src={section.imageUrl}
              alt={section.title}
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="w-full lg:w-1/2 text-start lg:text-left mt-4 lg:mt-0">
            <h2
              className="lg:text-4xl text-xl font-bold text-gray-800 mb-8"
              dangerouslySetInnerHTML={{ __html: section.title }}
            ></h2>
            <p
              className="text-gray-400 font-semibold mt-2 text-2xl"
              dangerouslySetInnerHTML={{ __html: section.description }}
            ></p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ContentSection
