import Head from "next/head";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TutorialApp } from "./tutorial-app";
import { Header } from "./header";

export function BattleShip() {  

  return (
    <>     
      <div className="relative flex min-h-screen items-center justify-center">
        <div className="App">
          <DndProvider backend={HTML5Backend}>
            <div className="fixed inset-0 h-16 border">
              <Header />
            </div>
            <TutorialApp />
          </DndProvider>
        </div>
      </div>
    </>
  );
}
