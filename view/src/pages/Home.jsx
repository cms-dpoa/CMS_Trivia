import React from "react";
import { Container } from "react-bootstrap";

const Home = () => {
  return (
    <Container>
<h1 id="introduction">Introduction</h1>
<p>Datasets in the <a href="https://opendata.cern.ch/">CERN open data portal</a> are categorized (or labelled) according to the physics subfield they relate to. For example, the dataset <code>/GluGluHToGG_M123_13TeV_amcatnloFXFX_pythia8/RunIIFall15MiniAODv2-PU25nsData2015v1_76X_mcRun2_asymptotic_v12-v1/MINIAODSIM</code> belongs to the category: <code>Higgs Physics/Standard Model</code>.
Assigning labels to each dataset is a tedious task because researchers sometimes don&#39;t follow the naming convention and the categories are not present in the dataset metadata. Until now, this categorization has been done &quot;by-hand&quot;, by interviewing experts on the content of each dataset.
The problem is that there are more than 600 datasets (and more to come) that have not yet been categorized. These datasets are thus not accessible for researchers who do not know the exact name of the dataset.
The purpose of this game is to enable CERN researchers to easily assign a label to each unlabelled dataset in the open data collection, making it a less tedious task.</p>
<p>The game is vaguely inspired by the TV show: Who Wants to be a Millionaire.</p>
<h1 id="level-1">Level 1</h1>
<p>In this level, the players&#39; reliability is assessed. This will help us choose a category for an unlabelled dataset in case various options are proposed by different players.
Questions in this level consist on the classification of an already labelled dataset.
For example the dataset
<code>/BlackHole_BH1_MD-2000_MBH-10000_n-2_TuneCUETP8M1_13TeV-blackmax/...</code> corresponds to the category <code>Exotica/Extra Dimensions</code>.
Two lifelines will be available:</p>
<ul>
<li>50:50 - Two incorrect answers are eliminated, leaving the contestant with a choice between the correct answer and one remaining incorrect answer.</li>
<li>Phone a Friend - Higgs, Feynman and other famous physists appear on screen and give hints on what they believe the answer might be.</li>
</ul>
<h1 id="level-2">Level 2</h1>
<p>This level is the central part of the game. In this level, questions consist on the classification of unlabelled datasets. In this case, there will be no options and no lifelines (we don&#39;t know the true label). There&#39;s also the possibility to create a new category. How much we trust your answers will be based on your score in Level 1.
By answering these questions you will help built a more complete CMS open data portal.</p>
<p>Thanks for playing!</p>
    </Container>
  );
};

export default Home;
