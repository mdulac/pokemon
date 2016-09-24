package model

import spray.json.{DefaultJsonProtocol, DeserializationException, JsArray, JsNumber, JsObject, JsString, JsValue, RootJsonFormat}

case class Stat(name: String, effort: BigDecimal, base_stat: BigDecimal)

object Stat extends DefaultJsonProtocol {

  implicit object StatsJsonFormat extends RootJsonFormat[List[Stat]] {

    override def write(stats: List[Stat]) = JsArray(
      stats.map(s => JsObject(
        "name" -> JsString(s.name),
        "effort" -> JsNumber(s.effort),
        "base_stat" -> JsNumber(s.base_stat)
      ))
    )

    override def read(value: JsValue) = {
      value match {
        case JsArray(stats) =>
          stats
            .toList
            .map(v => v.asJsObject)
            .map { o =>
              o.getFields("stat", "effort", "base_stat") match {
                case Seq(JsObject(stat), JsNumber(effort), JsNumber(base_stat)) =>
                  Stat(stat("name").convertTo[String], effort, base_stat)
              }
            }
        case _ =>
          throw DeserializationException("Pokemon stats expected")
      }
    }
  }

}

