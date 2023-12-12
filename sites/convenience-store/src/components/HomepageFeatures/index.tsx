import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Code",
    Svg: require("@site/static/img/undraw_hacker_mind.svg").default,
    description: (
      <>
        This isle contains code snippets and working scripts that are useful for
        reference or direct copy and paste in your projects.
      </>
    ),
  },
  {
    title: "Patterns",
    Svg: require("@site/static/img/undraw_product_teardown.svg").default,
    description: (
      <>
        This isle will contain explanations and example implementations of
        different software patterns and concepts.
      </>
    ),
  },
  {
    title: "Process",
    Svg: require("@site/static/img/undraw_launching.svg").default,
    description: (
      <>
        This isle will contain explanations of some tools and process guidelines
        that can be used to enhance your day-to-day as a software engineer.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.isleSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.isles}>
      <div className="container">
        <h2 className={styles.isleHeader}>Isles</h2>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
