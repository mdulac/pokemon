package model

import org.scalatest.{FlatSpec, Matchers}

class StatSpec extends FlatSpec with Matchers {

  "Stat" should "process empty average" in {
    Stat.averageOf(Nil) shouldBe Nil
  }

  "Stat" should "process average of one base stat" in {
    Stat.averageOf(Stat("stat", 10, 20) :: Nil) shouldBe (("stat", 20) :: Nil)
  }

  "Stat" should "process average of two same base stats" in {
    Stat.averageOf(
      Stat("stat", 10, 20) ::
        Stat("stat", 10, 30) ::
        Nil
    ) shouldBe (("stat", 25) :: Nil)
  }

  "Stat" should "process average of two different base stats" in {
    Stat.averageOf(
      Stat("stat1", 10, 20) ::
        Stat("stat2", 10, 30) ::
        Nil
    ) shouldBe (("stat1", 20) :: ("stat2", 30) :: Nil)
  }

  "Stat" should "process average of several same base stats" in {
    Stat.averageOf(
      Stat("stat", 10, 20) ::
        Stat("stat", 10, 30) ::
        Stat("stat", 10, 50) ::
        Stat("stat", 10, 20) ::
        Nil
    ) shouldBe (("stat", 30) :: Nil)
  }

  "Stat" should "process average of several different base stats" in {
    Stat.averageOf(
      Stat("stat1", 10, 20) ::
        Stat("stat1", 10, 30) ::
        Stat("stat1", 10, 50) ::
        Stat("stat1", 10, 20) ::
        Stat("stat2", 10, 20) ::
        Stat("stat2", 10, 30) ::
        Stat("stat2", 10, 50) ::
        Stat("stat2", 10, 20) ::
        Nil
    ) shouldBe (("stat1", 30) :: ("stat2", 30) :: Nil)
  }

}
