import { useBlockProps } from "@wordpress/block-editor";

interface SaveProps {
  attributes: {
    color: string;
    tabsUid: string;
    blockId: string;
    title: string;
    description: string;
    buttonText: string;
  };
}

export default function save({ attributes }: SaveProps) {
  const blockProps = useBlockProps.save();
  return (
    <>
      <div {...blockProps}>
        {/* <div>Animation</div>
        <div className="fau-counter-data" data-start="0" data-duration="4" data-ease="power1.in" data-stagger="1.0">1900000</div>
        <div className="fau-counter-data" data-start="1" data-duration="2" data-ease="power1.in" data-stagger="1.0">1000000000</div>
        <div className="data">1000</div>
        <div>End result</div>
        <div className="">1,900,000</div>
        <div className="">1,000,000,000</div>
        <div className="">1,000</div> */}
        <div className="fauCustomResearchHighlightBox">
          <dl className="rrze-elements-counter">
            <dt>
              <a
                href="https://www.fau.de/forschungsprofil/forschungsschwerpunkte-der-fau/exploring-principles-of-nature/"
                data-wpel-link="internal"
              >
                <span className="fau-counter-data">{attributes.title}</span>
              </a>
            </dt>
            <dd>
              {attributes.description}
              <br />
              <a
                className="standard-btn ghost-btn"
                href="https://www.fau.de/forschungsprofil/forschungsschwerpunkte-der-fau/exploring-principles-of-nature/"
                data-wpel-link="internal"
              >
                {attributes.buttonText}
              </a>
            </dd>
          </dl>
        </div>
        <section className="fauCustomResearchHighlights">
          <div className="fauCustomResearchHighlightBox">
          <dl className="rrze-elements-counter">
            <dt>
              <a
                href="https://www.fau.de/forschungsprofil/forschungsschwerpunkte-der-fau/exploring-principles-of-nature/"
                data-wpel-link="internal"
              >
                <span className="fau-counter-data">197000005</span>
              </a>
            </dt>
            <dd>
              Weiterlesen
              <br />
              <a
                className="standard-btn ghost-btn"
                href="https://www.fau.de/forschungsprofil/forschungsschwerpunkte-der-fau/exploring-principles-of-nature/"
                data-wpel-link="internal"
              >
                Weiterlesen
              </a>
            </dd>
          </dl>
          </div>
          <div className="fauCustomResearchHighlightBox">
            <dl className="rrze-elements-counter">
              <dt
                className="fau-counter-data"
                data-start="1"
                data-duration="2"
                data-ease="power1.in"
                data-stagger="1.0"
              >
                <a
                  href="https://www.fau.de/forschungsprofil/forschungsschwerpunkte-der-fau/targeting-environmental-and-economic-challenges/"
                  data-wpel-link="internal"
                >
                  1925465
                </a>
              </dt>
              <dd>environmental and economic challenges</dd>
            </dl>
          </div>
          <div className="fauCustomResearchHighlightBox">
            <dl>
              <dt>
                <a
                  href="https://www.fau.de/forschungsprofil/forschungsschwerpunkte-der-fau/targeting-environmental-and-economic-challenges/"
                  data-wpel-link="internal"
                >
                  Targeting
                </a>
              </dt>
              <dd>environmental and economic challenges</dd>
            </dl>
          </div>
          <div className="fauCustomResearchHighlightBox">
            <dl>
              <dt>
                <a
                  href="https://www.fau.de/forschungsprofil/forschungsschwerpunkte-der-fau/targeting-environmental-and-economic-challenges/"
                  data-wpel-link="internal"
                >
                  Targeting
                </a>
              </dt>
              <dd>environmental and economic challenges</dd>
            </dl>
          </div>
          <div className="fauCustomResearchHighlightBox">
            <dl>
              <dt>
                <a
                  href="https://www.fau.de/forschungsprofil/forschungsschwerpunkte-der-fau/targeting-environmental-and-economic-challenges/"
                  data-wpel-link="internal"
                >
                  Targeting
                </a>
              </dt>
              <dd>environmental and economic challenges</dd>
            </dl>
          </div>
        </section>
      </div>
    </>
  );
}
