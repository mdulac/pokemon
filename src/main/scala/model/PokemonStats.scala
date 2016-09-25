package model

import spray.json.{DefaultJsonProtocol, DeserializationException, JsObject, JsValue, RootJsonFormat, _}

case class PokemonStats(stats: List[Stat])

object PokemonStats extends DefaultJsonProtocol {

  implicit object PokemonDetailsJsonFormat extends RootJsonFormat[PokemonStats] {
    override def write(p: PokemonStats) = JsObject(
      "stats" -> p.stats.toJson
    )

    override def read(value: JsValue) = {
      value.asJsObject.getFields("stats") match {
        case Seq(stats) =>
          PokemonStats(
            stats.convertTo[List[Stat]]
          )
        case _ =>
          throw DeserializationException("Pokemon stats expected")
      }
    }
  }

}
