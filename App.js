import React, {useState, useEffect} from 'react';
 import {SafeAreaView, useWindowDimensions, View} from 'react-native';
 import {EngineView, useEngine} from '@babylonjs/react-native';
 import {Scene, SceneLoader, DeviceOrientationCamera, Vector3, FreeCamera} from '@babylonjs/core';
 import '@babylonjs/loaders/glTF';
 
 const EngineScreen = (props) => {
   const engine = useEngine();
   const [camera, setCamera] = useState();
   useEffect(() => {
     if (engine) {
       const scene = new Scene(engine)
       scene.createDefaultLight()
       const url =
         'https://github.com/KhronosGroup/glTF-Sample-Models/blob/master/2.0/Duck/glTF-Binary/Duck.glb?raw=true';
       SceneLoader.Append("", url, scene, (sc => {
        let cam;
        try {
          // When FreeCamera is used, the scene renders fine
          // cam = new FreeCamera('FreeCamera', new Vector3(-10, 1, 1), sc);
          // cam.setTarget(new Vector3(0, 0, 0))

          // When DeviceOrientationCamera is used, it throws an error
          cam = new DeviceOrientationCamera('DeviceOrientationCamera', new Vector3(10, 1, 1), sc);
        } catch (err) {
          console.log(err);
          throw err;
        }

        const canvas = engine.getRenderingCanvas();
        cam.attachControl(canvas, true);  
        setCamera(sc.activeCamera);
       }));
     }
   }, [engine]);
 
   return (
     <>
       <View style={props.style}>
         <View style={{flex: 1}}>
           <EngineView camera={camera} displayFrameRate={true} />
         </View>
       </View>
     </>
   );
 };
 
 const App = () => {
   const {width, height} = useWindowDimensions();
   return (
     <>
       <SafeAreaView
         style={{
           flex: 1,
           backgroundColor: 'red',
           height,
           width,
         }}>
         <EngineScreen style={{flex: 1}} />
       </SafeAreaView>
     </>
   );
 };
 
 export default App;
 