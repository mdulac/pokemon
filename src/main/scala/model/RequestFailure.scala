package model

sealed trait RequestFailure {
  val message: String
}

object RequestFailure {

  case class InvalidName(name: String) extends RequestFailure {
    override val message = s"$name is invalid"
  }

  case class NameNotFound(name: String) extends RequestFailure {
    override val message = s"$name not found"
  }

}