'use client';
import { useState } from "react";
import ContainerButtonBack from "./components/Modal";


const MainPage = () => {

  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <h1>Nuestra página principal y bien fea</h1>
      <button onClick={()=>{setShowModal(true)}}>Enseñar ese modalito</button>
      {showModal && <ContainerButtonBack setState={setShowModal}>
        <h2>Este es el título dentro del container</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores obcaecati ipsam veniam repudiandae tempore quisquam dolorem placeat quis! Fugit, quasi consectetur excepturi eos optio, et, cum perferendis voluptas quo eveniet itaque. Ducimus aut minus iste voluptatum placeat suscipit dicta accusantium vitae ipsum quas necessitatibus et, quos veritatis quam? Numquam nulla, vitae, quisquam nihil inventore, ad tenetur ipsam accusantium eveniet ea et praesentium quam rerum ipsum laboriosam sint veritatis voluptatibus. Quidem, aut quas? Culpa facere magni atque? Facere laudantium recusandae omnis molestias vitae, odit fugiat ex rem autem. Asperiores suscipit consequatur hic distinctio at officia eligendi nam libero necessitatibus explicabo. Numquam sapiente odit modi deserunt, et provident blanditiis aliquid nobis dignissimos ipsum tempore quibusdam ad quos quas nulla qui optio nemo? Quasi nisi quam assumenda odio suscipit voluptatibus corporis mollitia ex dignissimos tenetur dicta quae iste voluptates dolorum necessitatibus placeat sed, ratione non! Voluptas sapiente cumque deleniti maiores quis doloremque alias repudiandae harum fugiat assumenda, non natus dolorem eligendi odio, mollitia enim praesentium, facere vero molestias repellendus nihil labore! Laboriosam eos velit necessitatibus voluptas explicabo, culpa ullam voluptates quidem, vel a vero sequi nobis saepe dolores illum dolorum consequuntur? Perspiciatis velit, tempora nostrum doloremque voluptatum consectetur. Veritatis quibusdam fugit incidunt, vitae quam libero aliquid doloremque itaque hic eligendi quia, sunt accusantium praesentium laboriosam amet, nesciunt temporibus sed tenetur ratione facere autem! Nisi similique neque ab reprehenderit facilis. Itaque repudiandae consequuntur porro quae, quod quam possimus nostrum impedit, odit aspernatur esse deleniti facilis a praesentium. Corrupti recusandae placeat corporis tempore perspiciatis maiores repellendus consequuntur perferendis dolores, molestiae animi nam rerum, aperiam sint, doloribus quasi nihil architecto deleniti. Harum minus adipisci beatae cupiditate, ut voluptate molestiae repudiandae veritatis aut sed? Officia molestias aliquam, illo nam distinctio, temporibus adipisci iure voluptatibus ab provident hic ratione necessitatibus assumenda nulla quod earum explicabo ipsam voluptatem unde?</p>
      </ContainerButtonBack>}
    </div>
  )
}


export default MainPage;