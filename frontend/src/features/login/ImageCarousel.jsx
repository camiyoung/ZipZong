import "./ImageCarousel.css"

export default function ImageCarousel() {
  return (
    <div className="">
      <div class="marquee">
        <div class="marquee__group">
          <img src="/images/badgeIcon/bee.png" alt="" />
          <img src="/images/badgeIcon/cougar.png" alt="" />
          <img src="/images/badgeIcon/crab.png" alt="" />
          <img src="/images/badgeIcon/deer.png" alt="" />
          <img src="/images/badgeIcon/elephant.png" alt="" />
        </div>

        <div aria-hidden="true" class="marquee__group">
          <img src="/images/badgeIcon/ferret.png" alt="" />
          <img src="/images/badgeIcon/fish.png" alt="" />
          <img src="/images/badgeIcon/frog.png" alt="" />
          <img src="/images/badgeIcon/octopus.png" alt="" />
          <img src="/images/badgeIcon/pandaBear.png" alt="" />
        </div>
      </div>

      <div class="marquee marquee--reverse">
        <div class="marquee__group">
          <img src="/images/badgeIcon/pig.png" alt="" />
          <img src="/images/badgeIcon/rabbit.png" alt="" />
          <img src="/images/badgeIcon/shrimp.png" alt="" />
          <img src="/images/badgeIcon/turtle.png" alt="" />
          <img src="/images/badgeIcon/walrus.png" alt="" />
        </div>

        <div aria-hidden="true" class="marquee__group">
          <img src="/images/badgeIcon/whale.png" alt="" />
          <img src="/images/badgeIcon/yak.png" alt="" />
          <img src="/images/badgeIcon/person1.png" alt="" />
          <img src="/images/badgeIcon/person2.png" alt="" />
          <img src="/images/badgeIcon/person3.png" alt="" />
        </div>
      </div>

      <div class="marquee">
        <div class="marquee__group">
          <img src="/images/badgeIcon/groupMaxExerciseTime10.png" alt="" />
          <img src="/images/badgeIcon/groupMaxExerciseTime100.png" alt="" />
          <img src="/images/badgeIcon/groupMaxExerciseTime1000.png" alt="" />
          <img src="/images/badgeIcon/groupMaxExerciseTime10000.png" alt="" />
          <img src="/images/badgeIcon/groupMaxStreak3Days.png" alt="" />
        </div>

        <div aria-hidden="true" class="marquee__group">
          <img src="/images/badgeIcon/pig.png" alt="" />
          <img src="/images/badgeIcon/rabbit.png" alt="" />
          <img src="/images/badgeIcon/shrimp.png" alt="" />
          <img src="/images/badgeIcon/turtle.png" alt="" />
          <img src="/images/badgeIcon/walrus.png" alt="" />
        </div>
      </div>

      <div class="marquee marquee--reverse">
        <div class="marquee__group">
          <img src="/images/badgeIcon/groupMaxStreak7Days.png" alt="" />
          <img src="/images/badgeIcon/groupMaxStreak21Days.png" alt="" />
          <img src="/images/badgeIcon/groupMaxStreak66Days.png" alt="" />
          <img src="/images/badgeIcon/groupShieldFirstUse.png" alt="" />
          <img src="/images/badgeIcon/person4.png" alt="" />
        </div>

        <div aria-hidden="true" class="marquee__group">
          <img src="/images/badgeIcon/whale.png" alt="" />
          <img src="/images/badgeIcon/yak.png" alt="" />
          <img src="/images/badgeIcon/person1.png" alt="" />
          <img src="/images/badgeIcon/person2.png" alt="" />
          <img src="/images/badgeIcon/person3.png" alt="" />
        </div>
      </div>
    </div>
  )
}
