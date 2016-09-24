package model

import spray.json.{DefaultJsonProtocol, DeserializationException, JsArray, JsNumber, JsObject, JsValue, RootJsonFormat}

case class Stat(effort: BigDecimal, base_stat: BigDecimal)

object Stat extends DefaultJsonProtocol {

  implicit object StatsJsonFormat extends RootJsonFormat[List[Stat]] {

    override def write(stats: List[Stat]) = JsArray(
      stats.map(s => JsObject(
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
              o.getFields("effort", "base_stat") match {
                case Seq(JsNumber(effort), JsNumber(base_stat)) =>
                  Stat(effort, base_stat)
              }
            }
        case _ =>
          throw DeserializationException("Pokemon stats expected")
      }
    }
  }

}

