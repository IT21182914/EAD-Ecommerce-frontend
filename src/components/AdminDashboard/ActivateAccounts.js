import React from "react";
import Sidebar from "./AdminSidebar";
import { Container, Nav } from "react-bootstrap";
import AdminNavBar from "./AdminNavBar";

export default function ActivateAccounts() {
  return (
    <div className="d-flex flex-row" style={{ width: "100%", height: "100vh" }}>
      <Sidebar />
      <div
        className="bg-body-secondary d-flex flex-column flex-grow-1"
        style={{ marginLeft: "240px" }}
      >
        <AdminNavBar notification={[]} />
        <Container
          fluid
          className="p-4 overflow-scroll"
          style={{ height: "100%" }}
        >
          <div className="container">
            <h1>Activate Accounts</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit
              amet mauris ac ligula porttitor rhoncus eget at risus. Maecenas
              pretium dui tellus, a venenatis massa maximus vitae. Duis quis
              purus at massa maximus euismod. Phasellus a orci suscipit,
              fringilla urna at, mollis neque. Suspendisse vel eros orci.
              Vestibulum eu diam et nulla auctor dignissim vitae sed diam.
              Mauris ut metus ut turpis accumsan vestibulum. Sed id malesuada
              massa. Fusce feugiat, ante et porta condimentum, erat leo auctor
              eros, ut hendrerit velit neque ut ante. Nullam convallis egestas
              arcu, vel consectetur tortor mollis quis. Duis cursus tellus a
              ligula ultrices, et molestie orci egestas. Nunc tincidunt
              ullamcorper eros vitae ullamcorper. Nulla facilisi. Nullam diam
              elit, malesuada faucibus cursus ac, faucibus non ipsum. Donec quis
              scelerisque orci. Nulla facilisi. Nullam sollicitudin metus luctus
              velit finibus, sed pulvinar tortor commodo. Proin scelerisque
              tristique nunc, eget maximus quam luctus id. Vestibulum mattis
              velit sit amet odio ullamcorper, non rhoncus purus porta. Quisque
              lacus urna, feugiat dapibus diam a, blandit porta magna. Cras
              maximus suscipit nisl, sed laoreet magna condimentum eget. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Sed hendrerit
              neque id placerat hendrerit. Nulla facilisi. In hac habitasse
              platea dictumst. Nullam vehicula, justo vitae mollis feugiat, nisl
              ante volutpat quam, ac consectetur libero leo nec dolor. Praesent
              in elit vitae nulla fermentum lobortis sit amet eu risus. Donec id
              dui vitae lectus tincidunt luctus sed sit amet felis. Praesent
              fringilla porta mollis. Vestibulum placerat dolor sapien, vel
              vehicula tortor porttitor at. Sed a metus enim. Suspendisse leo
              ligula, vehicula pharetra lacus sed, laoreet rutrum purus. Cras
              venenatis nulla sed tellus gravida, finibus laoreet lacus
              efficitur. Mauris aliquam blandit nulla, ac luctus dolor mollis
              id. Mauris faucibus vestibulum pulvinar. Nunc sit amet mi quis
              urna fringilla blandit. Praesent vitae nunc sit amet magna
              fermentum ultricies sit amet ut velit. Aliquam erat volutpat.
              Pellentesque id lectus vel velit placerat egestas sit amet at
              enim. Curabitur maximus consectetur aliquet. Nunc condimentum vel
              ipsum at ullamcorper. In blandit dolor non sapien faucibus
              lobortis. Proin at sem id lacus commodo dapibus sit amet id arcu.
              Ut vel accumsan mi. Nam lacus urna, sagittis id augue nec, semper
              faucibus lectus. Suspendisse potenti. Morbi ac orci a mi
              scelerisque aliquam dapibus at eros. Duis porta ultrices arcu, sed
              vulputate sapien. Donec eget tincidunt ipsum, sed pulvinar nisi.
              Proin id pharetra ex. Curabitur dignissim tincidunt sollicitudin.
              Duis feugiat tempus metus at dictum. Quisque elementum leo sed
              neque auctor tempor. Cras mattis risus sit amet dolor porta
              pellentesque. Ut vulputate magna ut orci tincidunt efficitur.
              Fusce id velit ullamcorper odio tincidunt auctor non at elit.
              Nulla est libero, elementum nec velit vel, euismod consectetur
              ipsum. Integer ex nulla, mattis id fringilla id, egestas vel
              felis. Nulla consequat magna vel mollis aliquam. Integer
              malesuada, orci a pellentesque lobortis, leo metus ullamcorper
              turpis, a viverra elit lorem id magna. Mauris at tristique tortor.
              Class aptent taciti sociosqu ad litora torquent per conubia
              nostra, per inceptos himenaeos. Nullam nec consectetur turpis.
              Pellentesque ex mi, semper quis tristique nec, posuere quis elit.
              Donec convallis sed quam cursus volutpat. Vestibulum ut auctor
              turpis, nec ullamcorper turpis. Nullam lobortis, lectus at
              venenatis dictum, arcu libero mollis elit, in accumsan massa
              mauris quis mi. Vestibulum at elit blandit, scelerisque nisl a,
              laoreet justo. Mauris auctor nisl ex, at sagittis justo posuere
              nec. Pellentesque consequat mi sit amet lacus facilisis
              condimentum. Morbi maximus luctus neque, ut consequat est lobortis
              ut. Pellentesque non libero convallis, posuere purus et, iaculis
              mi. Ut venenatis odio ac consequat finibus. Cras vel nisi egestas,
              fringilla ipsum a, tempor lectus. Vestibulum sollicitudin enim ac
              nisi accumsan, eu ultricies arcu facilisis. Pellentesque habitant
              morbi tristique senectus et netus et malesuada fames ac turpis
              egestas. Sed tincidunt id lorem vitae interdum. Donec porta ligula
              ac tellus viverra, non dignissim urna gravida. Cras iaculis eros
              tellus, nec pulvinar nulla ultricies ut. Proin blandit, risus
              lobortis convallis accumsan, nibh erat cursus augue, a convallis
              leo lectus ut enim. Nam tincidunt scelerisque ex, sit amet porta
              eros vulputate vestibulum. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Quisque et odio eget mi lacinia tincidunt vitae
              id massa. Nam maximus a nisl at feugiat. Vestibulum eget cursus
              mi. Morbi blandit feugiat porta. Aliquam dictum eget ex eget
              cursus. Morbi nec dolor pretium, condimentum urna id, sodales dui.
              Morbi vitae enim tempus, lacinia tellus sed, vestibulum ipsum.
              Duis dictum augue vitae sagittis euismod. Donec euismod, sem nec
              luctus ornare, erat est tempus mi, et dapibus nisi ante ac odio.
              Aliquam interdum nulla nulla, vel consectetur leo malesuada
              bibendum. Aliquam quam enim, feugiat et consequat vel, luctus eu
              tellus. Proin mattis augue nunc, non congue massa elementum vel.
              Sed dignissim lacus quis rutrum tristique. Orci varius natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Donec elit libero, aliquam sed facilisis eget, aliquet id sapien.
              Donec sodales auctor risus in imperdiet. Quisque purus quam,
              efficitur in blandit ut, malesuada eu nibh. In lobortis diam id
              ligula porta venenatis. Maecenas id feugiat enim, vitae dapibus
              elit. Maecenas vel congue nisi. Donec et ex vehicula, sodales
              libero nec, tempus nulla. Aenean fermentum dui sit amet risus
              varius, eu fermentum dolor euismod. Phasellus arcu velit, aliquam
              sit amet mi ac, condimentum tristique lectus. Nam vitae molestie
              nibh. Quisque in urna ac risus iaculis rhoncus vel sit amet
              turpis. Pellentesque vestibulum, nisi vel congue feugiat, erat ex
              ultrices sem, sit amet fermentum elit mauris et est. Nunc sit amet
              posuere turpis. Class aptent taciti sociosqu ad litora torquent
              per conubia nostra, per inceptos himenaeos. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit. Quisque sagittis vel massa ut
              efficitur. Aenean eget egestas neque, id pulvinar nulla. Phasellus
              dignissim orci mauris, quis rutrum mi tincidunt quis. Nam a ante
              metus. Ut viverra metus eget risus fermentum, quis feugiat leo
              ultrices. Aenean sollicitudin nisi risus, et rutrum tortor auctor
              quis. In congue lorem a risus tincidunt, a euismod libero
              fermentum. Aenean vel fringilla lacus. Suspendisse volutpat, enim
              eget consequat dictum, libero nisi gravida lectus, eu mattis elit
              ante non nunc. Sed ut mauris sollicitudin erat dictum posuere nec
              sit amet dui. Nam viverra consectetur orci, id laoreet augue
              eleifend at. Vestibulum cursus lorem dui, vitae lacinia purus
              molestie sit amet. Nulla et tincidunt nulla. Ut mollis nisl a
              ipsum varius, quis efficitur nulla egestas. Aenean id ex suscipit
              ex eleifend vestibulum in sit amet urna. Donec feugiat felis
              lectus, nec semper erat consectetur et. Fusce vitae hendrerit dui.
            </p>
          </div>
        </Container>
      </div>
    </div>
  );
}
