import React from 'react'
import {motion} from "framer-motion"
import me from "../../assets/istockphoto-1413669079-170667a.webp"
export default function founded() {
  const options={
    initial:{
        x:"-100%", opacity:0
    },
    whileInView:{x:0,
        opacity:1}
}
  return (
  <section className='founder'>
    <motion.div {...options}>
   <img src={me} alt="Founder" width={200} height={200} />
   <h3>Arjun</h3>
   <p>Hey Everyone I am Arjun ,THe founder of Kings burger
   <br />
   Our aim is to create the most tasty burger
   </p>
 
    </motion.div>
  </section>
  );
}
