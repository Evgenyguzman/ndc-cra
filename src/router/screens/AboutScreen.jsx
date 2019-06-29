import React from "react";
import { Button } from "../../components/ui/Buttons/Buttons";

export function AboutScreen() {
  return (
    <div>
      <section>
        <h2>Здесь будет рассказ о проекте</h2>
        <h3>Возможности</h3>
        <ul>
          <li>Доступ к данным Ваших контроллеров 24/7</li>
          <li>Удобные графики для анализа</li>
          <li>Управление/изменение необходимых параметров</li>
        </ul>
        <Button>Присоединиться</Button>
      </section>
      <section>
        <h3>Уже есть аккаунт?</h3>
        <Button>Войти</Button>
      </section>
      <section>
        <h3>About New Day</h3>
      </section>
    </div>
  )
}