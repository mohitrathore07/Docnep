import React from 'react';
import './labtest.css';
import Labtest1 from '../labtest1/labtest1';
import ShowTest from '../ShowTestComponant/showtestcomponant';
import ShowPackage from '../ShowPackageComponant/showpackage';
import ShowAll from '../ShowAllComponant/show-all';

const Labtest = () => {
  return (
      <>
      <Labtest1/>
      <ShowTest/>
      <ShowPackage/>
      <ShowAll/>
    </>
  )
}

export default Labtest
