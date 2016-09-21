package model

import spray.json.{DefaultJsonProtocol, DeserializationException, JsNumber, JsObject, JsString, JsValue, RootJsonFormat}

case class PokemonCount(count: BigDecimal)

object PokemonCount extends DefaultJsonProtocol {

  implicit object PokemonCountJsonFormat extends RootJsonFormat[PokemonCount] {
    override def write(c: PokemonCount) = JsObject(
      "count" -> JsNumber(c.count)
    )

    override def read(value: JsValue) = {
      value.asJsObject.getFields("count") match {
        case Seq(JsNumber(count)) => PokemonCount(count)
        case _ => throw DeserializationException("Pokemon details expected")
      }
    }
  }

}