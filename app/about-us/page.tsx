import React from "react";
import OurService from "./components/OurService";

export default function AboutUs() {
  return (
    <div>
      <div className="bg-[url(/Fitrock-assets/imgs/happy-gym-couple.png)] bg-no-repeat bg-center bg-cover w-full h-130 text-white">
        <div className="flex flex-col gap-5 p-30">
          <h1 className="text-6xl font-bold">About Us</h1>
          <span className="text-4xl font-medium">
            Your Source of Quality Dumbbells <br /> & Fitness Excellence
          </span>
          <p className="font-semibold text-gray-200">
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee <br />
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            <br />
            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
          </p>
        </div>
      </div>
      <div className="flex justify-evenly">
        <div className="flex flex-col gap-5 py-7">
          <h1 className="text-5xl font-bold">Who We Are</h1>
          <p className=" text-lg">
            khrklsjhrlkjaklsjr alsraklujrkelaja asurlkaukelrujkela <br /> asrr
            ser aega eageasfearluaj aalsuelktuergkuekslgujkea <br />{" "}
            glkaukelrauskleualktg lausklruaklukergue <br /> a;gua;sue;luekgjk
            gejrhgjrewhirgh grgerg ljreklwlrkjerklwjekrlwjelkrjwelkrwjewr <br />
            wkjrhwejrhwelkrhwelkhrwkelhrwkelrl <br />
            rljkrlejtkelrjtklerjtkerljtkelrjtkeljtkelrjtkelrjtkerljtkerljyekrlkerl{" "}
            <br />
          </p>
        </div>
        <div className="flex flex-col gap-5 py-7">
          <h1 className="text-5xl font-bold">Our Mission</h1>
          <p className="text-lg">
            khrklsjhrlkjaklsjr alsraklujrkelaja asurlkaukelrujkela <br /> asrr
            ser aega eageasfearluaj aalsuelktuergkuekslgujkea <br />{" "}
            glkaukelrauskleualktg lausklruaklukergue <br /> a;gua;sue;luekgjk
            gejrhgjrewhirgh grgerg <br />
          </p>
        </div>
      </div>
      <div className="flex justify-between py-5">
        <OurService
          desc="Our Knowlegeble an frienly team is hare to offfer expert avice & support to lep you make informed decisions  "
          image
          label="Expert Support"
        />
        <OurService
          desc="Our Knowlegeble an frienly team is hare to offfer expert avice & support to lep you make informed decisions  "
          image
          label="Expert Support"
        />
        <OurService
          desc="Our Knowlegeble an frienly team is hare to offfer expert avice & support to lep you make informed decisions  "
          image
          label="Expert Support"
        />
        <OurService
          desc="Our Knowlegeble an frienly team is hare to offfer expert avice & support to lep you make informed decisions  "
          image
          label="Expert Support"
        />
      </div>
    </div>
  );
}
