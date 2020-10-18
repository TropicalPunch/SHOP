const products = [
  {
   
    name: 'The Manipulator',
    image: '/images/manipulator.jpg',
    poster: '/images/manipulatorPoster.jpg',
    interface: '/images/manipulatorInterface.png',
    compatibility: '/images/COMPATIBILITY-300x60.png',
    description: 'Extreme vocal transformer',
    longDescription:
      'Through unique granular algorithms, Manipulator can dramatically alter the timbre and pitch of monophonic audio in new and unexplored ways. From subtly imposing pitch and harmonization, to a full-on sonic mangle that will leave you with a totally new sound, Manipulator is as    versatile as it is creativity-inducing.',
    video1: 'https://www.youtube.com/embed/Fwfl3bRmv8Y',
    features: [
      'Bend and sculpt your sounds into new ones',
      'Alter timbre and pitch of vocals and instruments',
      '10 Different effects with endless combinations',
      'Change melodies of existing performances',
      'Create harmonies with up to 4 polyphonic voices',
      'Extensive modulation capabilities',
      'Real-time processing for live performance',
      `Supports VST / AU / AAX plug-in formats`,
    ],
    brand: 'Polyverse',
    category: 'plugin',
    price: 149,
    status: true,
    rating: 4.5,
    numReviews: 12,
  },
  {
    
    name: 'COMET',
    image: '/images/comet.jpg',
    description: 'Lush,versatile reverb',
    brand: 'Polyverse',
    category: 'plugin',
    price: 149,
    status: true,
    rating: 4.0,
    numReviews: 8,
    features: ['1', '2', ' 3'],
  },
  {
    
    name: 'INFECTED BUNDLE',
    image: '/images/pluginbundle.jpg',
    description: 'Work with the tools of the Shrooms',
    brand: 'Polyverse VS. Infected Mushrooms ',
    category: 'bundle',
    price: 249,
    status: true,
    rating: 3,
    numReviews: 12,
    features: ['1', '2', ' 3'],
  },
  {
    
    name: 'i WISH',
    image: '/images/iWish.jpg',
    description: 'Pitch freezer plug-in',
    brand: 'Sony',
    category: 'Electronics',
    price: 399.99,
    status: false,
    rating: 5,
    numReviews: 12,
    features: ['1', '2', ' 3'],
  },
  {
    
    name: 'WIDER',
    image: '/images/wider.jpg',
    description: 'Stereo widener plug-in',
    brand: 'Polyverse',
    category: 'Plugin',
    price: 'FREE',
    status: true,
    rating: 3.5,
    numReviews: 10,
    features: ['1', '2', ' 3'],
  },
]

// export default products //we cannot use the ES module format so...
// module.exports = products

//after we added the "type": "module", in thew backend package.json we can use es module so:
export default products
